import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

const techExpertSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    address: {
        type: String
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String
    },
    qualification: {
        type: String
    },
    experiance: {
        type: String
    },
    approved: {
        type: Boolean,
    },
    aadharCardNo: {
        type: String
    },
    certificateNo: {
        type: String
    }
});

techExpertSchema.pre('save', async function () {
    try {
        const userData = this;
        const saltRounds = 10;

        if (userData.isModified('password')) {
            userData.password =
                await bcrypt.hash(userData.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

techExpertSchema.pre('findOneAndUpdate', async function () {
    try {
        const userData = this.getUpdate();
        const saltRounds = 10;

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

export default mongoose.model("TechExpert", techExpertSchema);