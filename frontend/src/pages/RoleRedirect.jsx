import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import axios from 'axios';

const ROLE_PATHS = {
  admin: '/admin/dashboard',
  doctor: '/doctor/dashboard',
  receptionist: '/reception/dashboard',
  pharmacist: '/pharmacy/dashboard',
  patient: '/patient/dashboard'
};

const RoleRedirect = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth(); // Import useAuth from clerk

  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      const role = user.publicMetadata?.role;
      if (!role) {
        // Auto-assign patient role without showing any selection screen
        getToken().then(token => {
          axios.post('/api/auth/set-role', { role: 'patient' }, {
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(() => user.reload())
            .then(() => navigate('/', { replace: true }))
            .catch(err => {
              console.error('Role setup failed', err);
              // Fallback navigate just in case the server fails so they don't get stuck forever
              navigate('/', { replace: true });
            });
        });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, isLoaded, navigate, getToken]);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Redirecting to your dashboard…</p>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default RoleRedirect;