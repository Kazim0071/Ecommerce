import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

// PATH     : /api/users/profile
// METHOD   : GET
// ACCESS   : Private
// DESC     : Get logged in user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});
