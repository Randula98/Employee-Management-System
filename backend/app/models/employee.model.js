import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LANGUAGE_ENUM = ['C#', 'Java', 'PHP'];

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    lang: {
        type: Array,
        required: true,
        validate: {
            validator: function (value) {
                return value.every(lang => LANGUAGE_ENUM.includes(lang));
            },
            message: 'Languages should only include "C#", "Java", or "PHP".'
        }
    },
}, {
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "updatedOn",
    },
})

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;