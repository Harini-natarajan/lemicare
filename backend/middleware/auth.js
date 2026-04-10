const { verifyToken } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    const clerkId = payload.sub;
    const role = payload.publicMetadata?.role || 'patient';
    const email = payload.emailAddresses?.[0]?.emailAddress || payload.email || payload.email_address || '';
    const name = payload.name || [payload.first_name, payload.last_name].filter(Boolean).join(' ') || email || 'Clerk User';

    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.create({ clerkId, name, email, role });
    } else {
      if (user.role !== role) {
        user.role = role;
        await user.save();
      }
    }

    req.user = {
      clerkId,
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    };
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;