const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Vérification des données
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simuler l'ajout d'un utilisateur (remplacer par la base de données plus tard)
        const newUser = {
            id: Date.now(), // Simule un ID unique
            username,
            email,
            password: hashedPassword
        };

        res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error });
    }
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
        // Simuler la recherche d'un utilisateur (remplacer par la base de données)
        const user = {
            email: 'exemple@mail.com',
            password: '$2b$10$2S6eNj/YU8uBL5F5xUbXg.5cPaBLTfN6.k6ovjIbY/BxU5ZMGgHZC' // Mot de passe haché pour "password123"
        };

        // Vérifier l'utilisateur
        if (email !== user.email) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ message: 'Connexion réussie.', token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error });
    }
};

module.exports = { registerUser, loginUser };
