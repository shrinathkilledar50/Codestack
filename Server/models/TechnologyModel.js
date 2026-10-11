import mongoose, { Schema } from "mongoose";

const technologySchema = new Schema({
    technology: {
        type: String
    },
    description: {
        type: String
    }

});


export default mongoose.model("Technology", technologySchema);