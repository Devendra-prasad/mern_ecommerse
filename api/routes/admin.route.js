import express from 'express';
import { getMetrics, getUsers, deleteUser, getListings, deleteListing, approveListing } from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

// Apply middleware to all routes in this router
router.use(verifyToken, verifyAdmin);

router.get('/metrics', getMetrics);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/listings', getListings);
router.delete('/listings/:id', deleteListing);
router.patch('/listings/:id/approve', approveListing);

export default router;
