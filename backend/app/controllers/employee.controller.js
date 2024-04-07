import Employee from '../models/employee.model.js';

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        return res.status(201).json(employee);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json(employees);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        return res.status(200).json(employee);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(employee);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        return res.status(204).json();
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
