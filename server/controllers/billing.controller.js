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
    console.log(req.body);
    let body = req.body;

    Billing.create(body)
        .then(data => {
            console.log(`New billing created`, data);

            return res.status(201).json({
                message: "Billing created",
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