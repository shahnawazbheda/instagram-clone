

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { setUploadPath, authenticateToken } = require('../middleware/middleware');
const { handleFileUpload, handleSingleFileUpload } = require('../helper/helper');
const upload = require('../middleware/fileUpload');

router.delete('/deletePost', authenticateToken, postController.deletePost);
router.delete('/deletePerticularPost', authenticateToken, postController.deletePerticularPost);
router.get('/getOwnAllPosts', authenticateToken, postController.getOwnAllPosts);
router.get('/getAllPosts', authenticateToken, postController.getAllPosts);
router.get('/getPostById', authenticateToken, postController.getPostById);
router.get('/getPostsByUserId', authenticateToken, postController.getPostsByUserId);
router.post('/upload-single-post', authenticateToken, upload.single('file'), postController.uploadSinglePost);

router.post('/upload-multiple-post', authenticateToken, setUploadPath, upload.array('files'), postController.UploadPost);

module.exports = router;