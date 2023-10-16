const mongoose = require("mongoose");

// Validate it is number 
// Validate if the value has been passed 
// find by id --> document then id is found else --> use id

const nameSchema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true, 
        unique: true, 
    }, 
    name: {
        type: String, 
        trim: true, 
        required: true, 
        uppercase: true, 
    },
    budget: {
        type: String, 
        trim: true, 
        required: true, 
    }
}, {collection: 'names'})

module.export = mongoose.model('names', nameSchema); 