import express from "express"
import { createTechnology, deleteTechnologyById, getAllTechnologies, updateTechnologyById } from "../controller/TechnologyController.js";

const technologyRouter = express.Router();

technologyRouter.post("/createCategory", createTechnology);
technologyRouter.get("/", getAllTechnologies);
technologyRouter.put("/updateCategoryById/:id", updateTechnologyById);
technologyRouter.delete("/deleteCategoryById/:id", deleteTechnologyById);

export default technologyRouter;