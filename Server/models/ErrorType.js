import mongoose, { Schema } from "mongoose";

const errorTypeSchema = new Schema({
    errorType: {
        type: String
    },
    description: {
        type: String
    }

});


export default mongoose.model("ErrorType", errorTypeSchema);