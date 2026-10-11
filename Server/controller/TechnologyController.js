import Technology from "../models/TechnologyModel.js";

export const createTechnology = async (req, res) => {
    try {
        const technology = new Technology(req.body);

        if (!technology.technology) {
            return res.status(400).json({ message: 'Please provide technology name' });
        }

        const existingTechnology = await Technology.findOne({ technology    : technology.technology })

        if (existingTechnology) {
            return res.status(400)
                .json({ message: "Error type is already Exsits" });
        }

        await technology.save();
        return res.status(200).json({ message: 'Technology created successfully' });

    } catch (err) {
        console.error('Error creating technology:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

export const getAllTechnologies = async (req, res) => {
    try {
        return res.status(200).json(await Technology.find());
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


export const updateTechnologyById = async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    try {
        const technology = await Technology.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ data: technology });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}

export const deleteTechnologyById = async (req, res) => {
    const { id } = req.params;

    try {
        const technology = await Technology.findByIdAndDelete(id, { new: true });

        return res.status(200).json({ data: technology });

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({ message: 'Internal server error', error });
    }
}