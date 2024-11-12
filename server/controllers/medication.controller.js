const Medication = require('../models/medication.model');

const readAll = (req, res) => {
    Medication.find()
        .then(medications => res.json(medications))
        .catch(err => res.status(400).json('Error: ' + err));
};

const readOne = (req, res) => {
    Medication.findById(req.params.id)
        .then(medication => res.json(medication))
        .catch(err => res.status(400).json('Error: ' + err));
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    Medication.create(body)
        .then(data => {
            console.log(`New medication created`, data);

            return res.status(201).json({
                message: "Medication created",
                data
            });
        })
        .catch(err => {
            console.log(err);
            if(err.name === 'ValidationError'){
                return res.status(422).json(err)
            }
            return res.status(500).json(err);
        });
};

const updateData = (req, res) => {

};

const deleteData = (req, res) => {
};

module.exports = {
    readAll,
    readOne,
    createData,
    updateData,
    deleteData
};