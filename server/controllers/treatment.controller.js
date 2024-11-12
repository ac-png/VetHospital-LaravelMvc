const Treatment = require('../models/treatment.model');

const readAll = (req, res) => {
    Treatment.find()
        .then(treatments => res.json(treatments))
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