const Treatment = require('../models/treatment.model');

const readAll = (req, res) => {
    Treatment.find()
        .then(treatments => res.json(treatments))
        .catch(err => res.status(400).json('Error: ' + err));
};

const readOne = (req, res) => {
    Treatment.findById(req.params.id)
    .then(treatment => res.json(treatment))
    .catch(err => res.status(400).json('Error: ' + err));
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    Treatment.create(body)
        .then(data => {
            console.log(`New treatment created`, data);

            return res.status(201).json({
                message: "Treatment created",
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