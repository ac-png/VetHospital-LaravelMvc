const Appointment = require('../models/appointment.model');

const readAll = (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
};

const readOne = (req, res) => {
    Appointment.findById(req.params.id)
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error: ' + err));
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    Appointment.create(body)
        .then(data => {
            console.log(`New appointment created`, data);

            return res.status(201).json({
                message: "Appointment created",
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