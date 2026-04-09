import express from "express";
import { createListing, deleteListing, updateListing, getListing, getListings, getUpcomingListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { validate } from "../middleware/validate.js";
import { listingSchema } from "../validations/listing.validation.js";

const router = express.Router();

router.post('/create', verifyToken, validate(listingSchema), createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.put('/update/:id', verifyToken, validate(listingSchema), updateListing)
router.get('/getUpcoming', getUpcomingListings)
router.get('/get/:id', getListing)
router.get('/get', getListings)

export default router;