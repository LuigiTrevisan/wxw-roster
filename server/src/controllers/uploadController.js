const { uploadFile, getFile, deleteFile } = require('../config/upload');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                error: 'File name is required'
            });
        }

        const buffer = req.file.buffer;
        const url = await uploadFile(buffer, req.body.name);
        res.status(200).json({
            success: true,
            data: url
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};

const getImage = async (req, res) => {
    try {
        if (!req.params.name) {
            return res.status(400).json({
                success: false,
                error: 'File name is required'
            });
        }
        const { name } = req.params;
        const url = getFile(name);
        res.status(200).json({
            success: true,
            data: url
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
}

const deleteImage = async (req, res) => {
    try {
        if (!req.params.name) {
            return res.status(400).json({
                success: false,
                error: 'File name is required'
            });
        }
        const { name } = req.params;
        deleteFile(name).then(result => {
            res.status(200).json({
                success: true,
                data: result
            });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
}

module.exports = {
    uploadImage,
    getImage,
    deleteImage
}