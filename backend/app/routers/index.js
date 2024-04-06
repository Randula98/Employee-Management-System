import UserRouter from './routes/user.route.js'

function routers(app) {
    app.use('/api/user', UserRouter);
}

export default routers;