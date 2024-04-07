const BASE_URL = 'http://localhost:8080';

export const LOGIN = `${BASE_URL}/api/user/login`;
export const REGISTER = `${BASE_URL}/api/user/register`;

export const EMPLOYEE_URL = `${BASE_URL}/api/employee`;
export const EMPLOYEE_URL_BY_ID = (id) => {
    return `${BASE_URL}/api/employee/${id}`;
}