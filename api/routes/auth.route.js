import express from 'express';
import { google, signin, signout, signup, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { signinSchema, signupSchema } from '../validations/auth.validation.js';

const router = express.Router();

router.post('/signup', authLimiter, validate(signupSchema), signup)
router.post('/signin', authLimiter, validate(signinSchema), signin)
router.post('/google', google)
router.get('/signout', signout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router;