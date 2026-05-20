import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const getMetrics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const pendingListings = await Listing.countDocuments({ isVerified: false });
    res.status(200).json({ totalUsers, totalListings, pendingListings });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    
    const totalUsers = await User.countDocuments();
    const users = await User.find().select('-password').skip(startIndex).limit(limit);
    
    res.status(200).json({ users, totalUsers });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    
    // Also delete the listings associated with this user
    await Listing.deleteMany({ userRef: req.params.id });

    res.status(200).json({ message: "User and associated listings deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const status = req.query.status;
    
    let filter = {};
    if (status === 'pending') {
      filter.isVerified = false;
    } else if (status === 'verified') {
      filter.isVerified = true;
    }
    
    const totalListings = await Listing.countDocuments(filter);
    const listings = await Listing.find(filter).populate('userRef', 'username email').skip(startIndex).limit(limit);
    
    res.status(200).json({ listings, totalListings });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const approveListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );
    if (!listing) return next(errorHandler(404, "Listing not found"));
    res.status(200).json({ message: "Listing approved successfully", listing });
  } catch (error) {
    next(error);
  }
};
