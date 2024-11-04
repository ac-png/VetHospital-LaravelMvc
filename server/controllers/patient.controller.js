const Patient = require('../models/patients.model');

const readAll = (req, res) => {
};

const readOne = (req, res) => {
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    Patient.create(body)
        .them(data => {
            console.log(`New patient created`, data);

            return res.status(201).json({
                message: `Patient created`,
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