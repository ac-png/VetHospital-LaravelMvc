const Patient = require('../models/patient.model');

const readAll = (req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));
};

const readOne = (req, res) => {
    Patient.findById(req.params.id)
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json('Error: ' + err));
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    Patient.create(body)
        .then(data => {
            console.log(`New patient created`, data);

            return res.status(201).json({
                message: "Patient created",
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