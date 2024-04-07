import axios from "axios";
import * as URL from "./endpoints/url";

const token = localStorage.getItem("token");

const getEmployees = async () => {
    return await axios.get(URL.EMPLOYEE_URL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
}

const getOneEmployee = async (id) => {
    return await axios.get(URL.EMPLOYEE_URL_BY_ID(id), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
}

const addEmployee = async (data) => {
    return await axios.post(URL.EMPLOYEE_URL, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
}

const updateEmployee = async (id, data) => {
    return await axios.put(URL.EMPLOYEE_URL_BY_ID(id), data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
}

const deleteEmployee = async (id) => {
    return await axios.delete(URL.EMPLOYEE_URL_BY_ID(id), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
}

export default {
    getEmployees,
    getOneEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
}

