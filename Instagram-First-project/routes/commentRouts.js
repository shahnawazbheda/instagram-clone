
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')
const { authenticateToken } = require('../middleware/middleware');


router.post('/CommentPost', authenticateToken, commentController.commentPost);
router.get('/getComment/:postId?', authenticateToken, commentController.getComment);
router.delete('/DeleteComment/:commentId?',authenticateToken,commentController.DeleteComment)




module.exports = router;