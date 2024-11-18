// index.js
const express = require('express'); // Importer Express
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Routes d'authentification
const postRoutes = require('./routes/postRoutes'); // Routes pour les posts

const mediaRoutes = require('./routes/mediaRoutes');

require('dotenv').config(); // Charger les variables d'environnement

const app = express(); // Créer une application Express

const PORT = process.env.PORT || 3000; // Définir le port (3000 par défaut)

// Middleware pour traiter les requêtes en JSON
app.use(express.json());

//Route de test
app.get('/', (req, res) => {
    res.send('Welcom to API Link Up !');
});

// Routes principales
app.use('/api/auth', authRoutes);

// Définir la base de l'URL pour les posts
app.use('/api/posts', postRoutes); // ici nous montons les routes des posts

app.use('/uploads', express.static('uploads'));

app.use('/api/media', mediaRoutes);




// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
