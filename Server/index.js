import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/UserRouter.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/CategoryRouter.js";
import notificationRouter from "./routes/NotificationsRouter.js";
import techExpertRouter from "./routes/TechExpertRouter.js";
import adminRouter from "./routes/AdminRouter.js";
import technologyRouter from "./routes/TechnologyRouter.js";
import errorTypeRoute from "./routes/ErrorTypeRouter.js";
import answerRouter from "./routes/AnswersRoute.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/notification", notificationRouter);
app.use("/techExpert", techExpertRouter);
app.use("/admin", adminRouter);
app.use("/technology", technologyRouter);
app.use("/errorType", errorTypeRoute);
app.use("/answers", answerRouter);

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL; // Updated to match .env variable

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connected Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on Port: ${PORT}`);
        });
    })
    .catch(error => console.log(error));
