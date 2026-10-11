import bcrypt from 'bcrypt'
import { sendApprovalEmail, sendForgotPasswordEmail, sendRejectEmail, sendWelcomeEmail, sendWelcomeEmailToTechExpert } from "../utils/EmailService.js";
import TechExpert from "../models/TechExpert.js";
import { generateRandomText } from '../utils/GenerateRandomText.js';

export const createTechExpert = async (req, res) => {
    try {
        const techExpert = new TechExpert(req.body);

        if (!techExpert.firstName || !techExpert.email || !techExpert.password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const email = techExpert.email;

        const existingTechExpert = await TechExpert.findOne({ email });

        console.log(existingTechExpert)
        if (existingTechExpert) {
            return res.status(400).json({ message: "TechExpert already exists" });
        }

        techExpert.approved = false;

        await techExpert.save();


        sendWelcomeEmailToTechExpert(techExpert.email, techExpert.firstName);

        return res.status(200).json({ message: "TechExpert created successfully" });
    } catch (error) {
        console.error("Error creating techExpert:", error);
        return res.status(500).json({ message: "An error occurred while processing your request" });
    }
};


export const approveTechSupportAccount = async (req, res) => {
    const { id } = req.params;

    try {

        const techExpert = await TechExpert.findById(id);

        if (!techExpert) {
            return res.status(404).json({ message: "Tech Expert not found" });
        }

        techExpert.approved = true;

        await techExpert.save();

        sendApprovalEmail(techExpert.email, techExpert.firstName);
        return res.status(200).json({ message: "TechExpert approved successfully" });

    } catch (error) {
        console.error("Error creating techExpert:", error);
        return res.status(500).json({ message: "An error occurred while processing your request" });
    }
}

export const rejectTechSupportAccount = async (req, res) => {
    const { id } = req.params;

    try {

        const techExpert = await TechExpert.findById(id);

        if (!techExpert) {
            return res.status(404).json({ message: "TechExpert not found" });
        }

        techExpert.approved = false;

        await techExpert.save();

        sendRejectEmail(techExpert.email, techExpert.firstName);
        return res.status(200).json({ message: "TechExpert approved successfully" });

    } catch (error) {
        console.error("Error creating techExpert:", error);
        return res.status(500).json({ message: "An error occurred while processing your request" });
    }
}


export const findAllTechExperts = async (req, res) => {
    return res.status(200).json(await TechExpert.find());
};

export const findTechExpertById = async (req, res) => {
    const { id } = req.params;

    try {
        const techExpert = await TechExpert.findById(id);

        if (!techExpert) {
            return res.status(404)
                .json({ message: 'TechExpert not found' });
        }

        return res.status(200).json({ data: techExpert });
    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error' });
    }
};

export const updateTechExpertById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const techExpert = await TechExpert.findByIdAndUpdate(id, updateData, { new: true });

        if (!techExpert) {
            return res.status(404)
                .json({ message: 'TechExpert not found' });
        }

        return res.status(200).json({ data: techExpert });
    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
};

export const deleteTechExpertByEmail = async (req, res) => {
    const id = req.params;

    try {
        const techExpert = await TechExpert.findByIdAndDelete(id);

        console.log(techExpert)
        if (!techExpert) {
            return res.status(404)
                .json({ message: 'TechExpert not found' });
        }

        return res.status(200)
            .json({ message: 'TechExpert deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const techExpert = await TechExpert.findOne({ email });
        if (!techExpert) {
            return res.status(404)
                .json({ message: "Tech Expert not found" });
        }

        if (techExpert.approved == false) {
            return res.status(401)
                .json({ message: "Your Account is not verified. Once it is verified we will let you know" });
        }

        const isMatch = await bcrypt.compare(password, techExpert.password); //true or false
        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json({ techExpert })

    } catch (err) {
        return res.status(500)
            .json({ message: "Server Error", err })
    }
}

export const changePassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const techExpert = await TechExpert.findById(id)

        if (!techExpert) {
            return res.status(404)
                .json({ message: "TechExpert not found" });
        }

        const isMatch = await
            bcrypt.compare(oldPassword, techExpert.password);

        if (!isMatch) {
            return res.status(401)
                .json({ message: "Entered password is wrong" });
        }

        techExpert.password = newPassword;

        await techExpert.save();

        return res.status(200)
            .json({
                message: "Password Changed Successfully :"
            });

    } catch (err) {
        return res.status(500)
            .json({ message: "Server error", err })
    }

}

export const forgotPassword = async (req, res) => {
    const { email } = req.params;
    try {

        console.log(email)
        let techExpert = await TechExpert.findOne({ email });

        if (!techExpert) {
            return res.status(404)
                .json({ message: "TechExpert Not Found" });
        }

        const randomText = generateRandomText(8); // Generate an 8-character random string

        techExpert.password = randomText;

        techExpert = await TechExpert.findByIdAndUpdate(techExpert._id, techExpert, { new: true });

        console.log("Updated Password: ", randomText);
        sendForgotPasswordEmail(techExpert.email, techExpert.firstName, randomText);
        return res.status(200)
            .json({ message: "Success" });
    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }
}