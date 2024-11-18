const multer = require('multer');
const path = require('path');

// Configuration du stockage local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Nom unique pour éviter les conflits
  }
});

// Filtrage des fichiers (optionnel)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non pris en charge'), false);
  }
};

// Limites sur les fichiers
const limits = {
  fileSize: 50 * 1024 * 1024 // Taille max : 50 Mo
};

// Middleware d'upload
const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
