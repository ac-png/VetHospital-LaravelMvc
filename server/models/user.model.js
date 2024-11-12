const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const validateEmail = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Role is required']
    }
}, { timestamps: true});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password, function(result){
        return result
    });
};

module.exports = model('User', userSchema);