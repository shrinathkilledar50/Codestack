import Answers from "../models/Answers.js";


export const createAnswers = async (req, res) => {

    try {

        const answer = new Answers(req.body);

        if (!answer) {
            return res.status(400)
                .json({ message: "There's nothing to save" });
        }

        await answer.save();

        return res.status(200)
            .json({ message: "Sub Answer saved Successfully" });

    } catch (error) {
        return res.status(500)
            .json({ message: `Internale Server error: ${error}` })
    }

}

export const getAllAnswers = async (req, res) => {
    try {
        return res.status(200).json(await Answers.find());
    } catch (err) {
        console.error('Error fetching answers:', err);
        return res.status(500).json({ message: `An error occurred while processing your request: ${err}` });
    }
};

export const getAnswersByTechnology = async (req, res) => {
    try {
        return res.status(200).json(await Answers.find({ technology: req.params.technology }));
    } catch (err) {
        console.error('Error fetching answers:', err);
        return res.status(500).json({ message: `An error occurred while processing your request:  ${err}` });
    }
}

export const getAnswersByErrorType = async (req, res) => {
    try {
        return res.status(200).json(await Answers.find({ errorType: req.params.errorType }
        ));
    } catch (err) {
        console.error('Error fetching answers:', err);
        return res.status(500).json({ message: `An error occurred while processing your request: ${err}` });
    }
}

export const getAnswersByTechnologyAndErrorType = async (req, res) => {
    try {
        return res.status(200).json(await Answers.find({
            technology: req.params.technology,
            errorType: req.params.errorType
        }));
    } catch (err) {
        console.error('Error fetching answers:', err);
        return res.status(500).json({
            message: `An error occurred while processing your request:
                ${err}`
        });
    }

}

export const updateAnswersById = async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    try {
        const answer = await Answers.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ data: answer });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}

export const deleteSubanswerById = async (req, res) => {
    
    try {
        const answer = await Answers.findByIdAndDelete(req.params.id, { new: true });

        return res.status(200).json({ data: answer });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}