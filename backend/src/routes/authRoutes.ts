import express from 'express';
import multer from 'multer';
import { loginUser, checkToken, registerUser } from '../controllers/authControllers.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);
router.post('/check-token', checkToken);

export default router;
