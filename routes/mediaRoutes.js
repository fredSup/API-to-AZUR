const express = require('express');
const upload = require('../middlewares/uploadMiddleware'); // Middleware multer
const router = express.Router();
const path = require('path');

// Route pour uploader un fichier
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Aucun fichier envoyé.' });
    }

    return res.status(201).json({
      message: 'Fichier uploadé avec succès.',
      filePath: `/uploads/${file.filename}`
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de l\'upload.', error });
  }
});

// Route pour récupérer un fichier
router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Fichier non trouvé.' });
    }
  });
});

module.exports = router;
