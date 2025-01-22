const Wrestler = require('../models/wrestler');

const getAllWrestlers = async (req, res) => {
    try {
        const wrestlers = await Wrestler.find({}).sort({ name: 1 });
        res.status(200).json({
            success: true,
            count: wrestlers.length,
            data: wrestlers
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        })
    }
}

const getWrestlerById = async (req, res) => {
    try {
        const wrestler = await Wrestler.findById(req.params.id);
        if (!wrestler) {
            return res.status(404).json({
                success: false,
                error: 'Wrestler not found'
            });
        }
        res.status(200).json({
            success: true,
            data: wrestler
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        })
    }
};

const createWrestler = async (req, res) => {
    try {
        requiredFields = ['name', 'gender']
        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    error: `Missing parameter ${field}`
                });
            }
        }
        if (req.body.isChampion && !req.body.championshipTitle) {
            return res.status(400).json({
                success: false,
                error: 'Missing parameter championshipTitle'
            });
        };

        const wrestler = await Wrestler.create(req.body);
        res.status(201).json({
            success: true,
            data: wrestler
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        })
    }
};

const updateWrestler = async (req, res) => {
    try {
        const wrestler = await Wrestler.findById(req.params.id);
        if (!wrestler) {
            return res.status(404).json({
                success: false,
                error: 'Wrestler not found'
            });
        }
        const updated = await Wrestler.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: updated
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        })
    }
};

const deleteWrestler = async (req, res) => {
    try {
        const wrestler = await Wrestler.findById(req.params.id);
        if (!wrestler) {
            return res.status(404).json({
                success: false,
                error: 'Wrestler not found'
            });
        }

        await Wrestler.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: wrestler
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        })
    }
};

module.exports = {
    getAllWrestlers,
    getWrestlerById,
    createWrestler,
    updateWrestler,
    deleteWrestler
}