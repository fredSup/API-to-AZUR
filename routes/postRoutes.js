const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../models/postModel');

// Route pour créer un post (accessible uniquement par un utilisateur connecté)
router.post('/', (req, res) => {
  console.log('Requête reçue : ', req.body); // Log de la requête
  const { userId, content } = req.body; // Envoie de userId et content pour créer un post
  if (!content) {
    return res.status(400).json({ message: 'Le contenu du post est requis.' });
  }
  const newPost = createPost(userId, content);
  res.status(201).json(newPost); // Retourner le post créé
});

// Route pour obtenir tous les posts
router.get('/', (req, res) => {
  const posts = getPosts();
  res.status(200).json(posts); // Retourner tous les posts
});

// Route pour obtenir un post spécifique par ID
router.get('/posts/:id', (req, res) => {
  const post = getPostById(parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post non trouvé.' });
  }
  res.status(200).json(post); // Retourner le post
});

// Route pour mettre à jour un post (accessible uniquement par l'auteur)
router.put('/posts/:id', (req, res) => {
  const { userId, content } = req.body;
  const post = updatePost(parseInt(req.params.id), userId, content);
  if (!post) {
    return res.status(400).json({ message: 'Post introuvable ou non autorisé à modifier.' });
  }
  res.status(200).json(post); // Retourner le post mis à jour
});

// Route pour supprimer un post (accessible uniquement par l'auteur)
router.delete('/posts/:id', (req, res) => {
  const { userId } = req.body;
  const success = deletePost(parseInt(req.params.id), userId);
  if (!success) {
    return res.status(400).json({ message: 'Post introuvable ou non autorisé à supprimer.' });
  }
  res.status(204).send(); // Supprimer le post (réponse sans contenu)
});

module.exports = router;
