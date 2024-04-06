import express from "express";
import employeeController from "../../controllers/employee.controller.js";
import { verifyToken } from "../../middleware/user.middleware.js";

const router = express.Router();

router.post("/", verifyToken, employeeController.createEmployee);
router.get("/", verifyToken, employeeController.getEmployees);
router.get("/:id", verifyToken, employeeController.getEmployeeById);
router.put("/:id", verifyToken, employeeController.updateEmployee);
router.delete("/:id", verifyToken, employeeController.deleteEmployee);

export default router;