import mongoose, { Schema } from "mongoose";


const answersSchema = new Schema({
    technology: {
        type: mongoose.Types.ObjectId,
        ref: 'Technology',
        required: true
    },
    errorType: {
        type: mongoose.Types.ObjectId,
        ref: 'ErrorType',
        required: true
    },
    description: {
        type: String,
    },
    solnSteps: {
        type: String,
    },
    links: {
        type: String,
    },
    video: {
        type: String,
    },
    books: {
        type: String
    }
});

export default mongoose.model("Answers", answersSchema);