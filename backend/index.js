import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv/config";

import routers from "./app/routers/index.js";

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

routers(app);

app.use(
    session({
        secret: "employee-management-system",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
            sameSite: "none",
            secure: true,
        },
    })
);

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

//sample call
app.get("/", (req, res) => {
    res.send("Backend for Mini eCommerce Web App is Running!");
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
});

app.listen(PORT, () => {
    console.log(`Node Server is up and running on port ${PORT}`);
});