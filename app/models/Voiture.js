const mongoose = require('mongoose');

const SchemaVoiture = new mongoose.Schema({
    marque: { type: String, required: true },
    couleur: { type: String, required: true },
    couleur: { type: String, required: true },
    entretiens: [
        {
            date: { type: Date, required: true },
            description: { type: String, required: true },
        }
    ],
});

module.exports = mongoose.model('Voiture', SchemaVoiture);
