const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Role is required']
    }
}, { timestamps: true});

module.exports = model('User', userSchema);