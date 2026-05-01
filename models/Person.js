const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


// Pre-save middleware to hash password
personSchema.pre('save', async function () {
    const person = this;

    // Only hash password if it is modified (or new)
    if (!person.isModified('password')) {
        return;
    }

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Replace plain password with hashed password
        person.password = hashedPassword;
    } catch (error) {
        throw error; // Let mongoose handle the error
    }
});

personSchema.methods.comparePassword = async function (condidatePassowrd) {
    try {
        const isMatch = await bcrypt.compare(condidatePassowrd, this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}
// Create Person modal
const Person = mongoose.model('Person', personSchema)
module.exports = Person;