import express from "express"
import { createErrorType, deleteErrorTypeById, getAllErrorTypes, updateErrorTypeById } from "../controller/ErrorTypeController.js";

const errorTypeRoute = express.Router();

errorTypeRoute.post("/createCategory", createErrorType);
errorTypeRoute.get("/", getAllErrorTypes);
errorTypeRoute.put("/updateCategoryById/:id", updateErrorTypeById);
errorTypeRoute.delete("/deleteCategoryById/:id", deleteErrorTypeById);

export default errorTypeRoute;  