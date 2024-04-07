import axios from "axios";
import * as URL from "./endpoints/url";

const login = async (data) => {
    return await axios.post(URL.LOGIN, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const register = async (data) => {
    return await axios.post(URL.REGISTER, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    login,
    register
}
