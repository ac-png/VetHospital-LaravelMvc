const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Helper function to validate email format
const validateEmail = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);  // Returns true if the email format is valid
};

// Define the schema for users
const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,  // Full name is required
        trim: true  // Removes any extra spaces
    },
    password: {
        type: String,
        required: true  // Password is required
    },
    email: {
        type: String,
        unique: true,  // Ensures email is unique
        lowercase: true,  // Automatically converts email to lowercase
        trim: true,  // Removes any extra spaces
        required: true,  // Email is required
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']  // Email format validation
    },
    role: {
        type: Schema.Types.ObjectId,  // Reference to the Role model
        ref: 'Role',
        required: true  // Role is required
    }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);  // Compares entered password with the stored hashed password
};

// Export the User model based on the schema
module.exports = model('User', userSchema);
