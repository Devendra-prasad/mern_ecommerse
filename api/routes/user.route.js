import express from 'express';
import { deleteUser, testing, updateUser, getUserListing, getUser, toggleFavorite, getFavorites } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { validate } from '../middleware/validate.js';
import { updateUserSchema } from '../validations/user.validation.js';

const router = express.Router();

router.get('/testing', testing)

router.post('/update/:id', verifyToken, validate(updateUserSchema), updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListing)
router.post('/favorites/:listingId', verifyToken, toggleFavorite)
router.get('/favorites/get', verifyToken, getFavorites)
router.get('/:id', verifyToken, getUser)

export default router;