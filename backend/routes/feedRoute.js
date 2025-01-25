import express from 'express';
// import upload from '../middlewares/multer.js';
import { upload } from '../middleware/cloudinaryConfig.js';
import Post from '../models/postModel.js';
import { protect } from '../middleware/authMiddleware.js'; // Add auth middleware for protected routes

const router = express.Router();

// Create a post
router.post('/create', protect, upload.single('photo'), async (req, res) => {
  try {
    const { caption } = req.body;
    const photoUrl = req.file.path; // URL from Cloudinary
    const post = new Post({
      caption,
      photoUrl,
      createdBy: req.user._id, // Authenticated user's ID
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('createdBy', 'name email') // Populate user details
      .sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;