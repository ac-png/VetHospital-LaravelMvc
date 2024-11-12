const Billing = require('../models/billing.model');

const readAll = (req, res) => {
    Billing.find()
        .then(billings => res.json(billings))
        .catch(err => res.status(400).json('Error: ' + err));
};

const readOne = (req, res) => {
    Billing.findById(req.params.id)
    .then(billing => res.json(billing))
    .catch(err => res.status(400).json('Error: ' + err));
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