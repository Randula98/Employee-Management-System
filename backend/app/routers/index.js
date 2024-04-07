import UserRouter from './routes/user.route.js'
import EmployeeRouter from './routes/employee.route.js'

function routers(app) {
    app.use('/api/user', UserRouter);
    app.use('/api/employee', EmployeeRouter);
}

export default routers;