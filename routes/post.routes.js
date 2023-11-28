/** @format */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../multer/multer-config');

router.get('/', postController.readPost);
router.get('/:id', postController.readOnePost);
router.post(
  '/',
  upload.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'link', maxCount: 1 },
  ]),
  postController.createPost
);
router.put('/:id', postController.updatePost);
router.put('/increment/:id', postController.incrementPost);
router.put('/active/:id', postController.activePost);
router.put('/hide/:id', postController.hidePost);
router.put('/block/:id', postController.blockPost);
router.delete('/:id', postController.deletePost);

// Commentaires vidéos
// Avec cette methode que nous pouvons faire l'action en étant connecté
// router.patch('/comment-post/:id', authMiddleware.requireAuth, postController.commentPost);
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;
