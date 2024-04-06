import express from "express";
import userController from "../../controllers/user.controller.js";
import userMiddleware from "../../middleware/user.middleware.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;