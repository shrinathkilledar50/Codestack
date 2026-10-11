import express from "express"
import { createAnswers, deleteSubanswerById, getAllAnswers, getAnswersByErrorType, getAnswersByTechnology, getAnswersByTechnologyAndErrorType, updateAnswersById } from "../controller/AnswersController.js";

const answerRouter = express.Router();

answerRouter.post("/create", createAnswers);
answerRouter.get("/", getAllAnswers);
answerRouter.put("/updateAnswerById/:id", updateAnswersById);
answerRouter.delete("/deleteAnswerById/:id", deleteSubanswerById);
answerRouter.get('/findAnswersByTechnology/:technology', getAnswersByTechnology);
answerRouter.get('/findAnswersByErrorType/:errorType', getAnswersByErrorType);
answerRouter.get('/findAnswersByTechnologyAndErrorType/:technology/:errorType', getAnswersByTechnologyAndErrorType);




export default answerRouter;