const Medication = require('../models/medication.model');

const readAll = (req, res) => {
    Medication.find()
        .then(medications => res.json(medications))
        .catch(err => res.status(400).json('Error: ' + err));
};

const readOne = (req, res) => {
};

const createData = (req, res) => {
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