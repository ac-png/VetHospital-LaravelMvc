const { Schema, model } = require('mongoose');

// Define the schema for roles
const roleSchema = new Schema({
    name: {
        type: String,  // Name of the role (e.g., Admin, Owner, Vet)
        required: true  // Role name is mandatory
    }
}, { timestamps: true });  // Automatically create createdAt and updatedAt fields

// Export the Role model based on the schema
module.exports = model('Role', roleSchema);
