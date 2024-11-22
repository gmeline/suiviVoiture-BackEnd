const express = require('express');
const Voiture = require('../models/Voiture'); 

const router = express.Router();

// Créer une nouvelle voiture
router.post('/', async (req, res) => {
    try {
        const voiture = new Voiture(req.body);
        await voiture.save();
        res.status(201).json(voiture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Récupérer toutes les voitures
router.get('/', async (req, res) => {
    try {
        const voitures = await Voiture.find();
        res.json(voitures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer une voiture spécifique
router.get('/:id', async (req, res) => {
    try {
        const voiture = await Voiture.findById(req.params.id);
        if (!voiture) return res.status(404).json({ message: 'Car not found' });
        res.json(voiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ajouter un entretien à une voiture
router.put('/:id/entretiens', async (req, res) => {
    try {
        const voiture = await Voiture.findById(req.params.id);
        if (!voiture) return res.status(404).json({ message: 'Car not found' });

        voiture.entretiens.push(req.body);
        await voiture.save();
        res.json(voiture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une voiture spécifique par son id
router.delete('/:id', async (req, res) => {
    try {
        const voiture = await Voiture.findByIdAndDelete(req.params.id);
        if (!voiture) {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }
        res.status(200).json({ message: 'Voiture supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Supprimer toutes les voitures
router.delete('/', async (req, res) => {
    try {
        await Voiture.deleteMany(); // Supprimer toutes les voitures
        res.status(200).json({ message: 'Toutes les voitures ont été supprimées' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
