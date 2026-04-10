const express = require('express');
const { clerkClient } = require('@clerk/clerk-sdk-node');
const auth = require('../middleware/auth');

const router = express.Router();

const ALLOWED_ROLES = ['patient', 'doctor', 'receptionist', 'pharmacist', 'admin'];

// POST /api/auth/set-role
// Called by first-time users to self-select their role.
// Sets publicMetadata.role on the Clerk user, which becomes the source of truth.
router.post('/set-role', auth, async (req, res) => {
  const { role } = req.body;

  if (!role || !ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  // Only allow the user to set their own role if they have no role yet
  // (i.e., publicMetadata.role is unset / undefined).
  // Admins can bypass this via UserManagement.
  const existingRole = req.user?.role;
  if (existingRole && existingRole !== 'patient') {
    // 'patient' is the default fallback; if they truly have a non-default role
    // already persisted in Clerk metadata, block re-selection.
    return res.status(403).json({ message: 'Role already set. Contact an admin to change it.' });
  }

  try {
    await clerkClient.users.updateUserMetadata(req.user.clerkId, {
      publicMetadata: { role },
    });

    return res.json({ success: true, role });
  } catch (err) {
    console.error('Clerk updateUserMetadata error:', err);
    return res.status(500).json({ message: 'Failed to update role. Please try again.' });
  }
});

module.exports = router;
