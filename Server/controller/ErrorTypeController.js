import ErrorType from "../models/ErrorType.js";

export const createErrorType = async (req, res) => {
    try {
        const errorType = new ErrorType(req.body);

        if (!errorType.errorType) {
            return res.status(400).json({ message: 'Please provide errorType name' });
        }

        const existingErrorType = await ErrorType.findOne({ errorType: errorType.errorType })

        if (existingErrorType) {
            return res.status(400)
                .json({ message: "Error type is already Exsits" });
        }

        await errorType.save();
        return res.status(200).json({ message: 'ErrorType created successfully' });

    } catch (err) {
        console.error('Error creating errorType:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

export const getAllErrorTypes = async (req, res) => {
    try {
        return res.status(200).json(await ErrorType.find());
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


export const updateErrorTypeById = async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    try {
        const errorType = await ErrorType.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ data: errorType });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}

export const deleteErrorTypeById = async (req, res) => {
    const { id } = req.params;

    try {
        const errorType = await ErrorType.findByIdAndDelete(id, { new: true });

        return res.status(200).json({ data: errorType });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}