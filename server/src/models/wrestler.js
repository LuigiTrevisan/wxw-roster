const mongoose = require('mongoose');

const wrestlerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    image: {
        type: String,
        required: false
    },
    isChampion: {
        type: Boolean,
        default: false
    },
    championshipTitle: {
        type: String,
        default: null
    },
    isTagTeam: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Wrestler', wrestlerSchema);