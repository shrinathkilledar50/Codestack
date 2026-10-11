import express from "express"
import { approveTechSupportAccount, changePassword, createTechExpert, deleteTechExpertByEmail, findAllTechExperts, findTechExpertById, forgotPassword, login, rejectTechSupportAccount, updateTechExpertById } from "../controller/TechExpertController.js";

const techExpertRouter = express.Router();
techExpertRouter.post("/createUser", createTechExpert);
techExpertRouter.get("/", findAllTechExperts);
techExpertRouter.get("/findByEmail/:id", findTechExpertById)
techExpertRouter.put("/updateById/:id", updateTechExpertById);
techExpertRouter.put("/approve/:id", approveTechSupportAccount)
techExpertRouter.put("/reject/:id", rejectTechSupportAccount);
techExpertRouter.delete("/deleteByEmail/:email", deleteTechExpertByEmail);
techExpertRouter.post("/login", login);
techExpertRouter.put("/changePassword/:id", changePassword);
techExpertRouter.put("/forgotPassword/:email", forgotPassword);
export default techExpertRouter;