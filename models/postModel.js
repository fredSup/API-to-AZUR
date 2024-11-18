// postModel.js
let posts = []; // Nous allons stocker les posts dans ce tableau pour l'instant

// Fonction pour créer un post
const createPost = (userId, content) => {
  const post = {
    id: posts.length + 1, // Simule l'auto-incrémentation
    userId,
    content,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  posts.push(post);
  return post;
};

// Fonction pour récupérer tous les posts
const getPosts = () => {
  return posts;
};

// Fonction pour récupérer un post par son ID
const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

// Fonction pour mettre à jour un post
const updatePost = (id, userId, content) => {
  const post = posts.find(post => post.id === id);
  if (post && post.userId === userId) {
    post.content = content;
    post.updatedAt = new Date();
    return post;
  }
  return null;
};

// Fonction pour supprimer un post
const deletePost = (id, userId) => {
  const postIndex = posts.findIndex(post => post.id === id && post.userId === userId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    return true;
  }
  return false;
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
