import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <SignedIn>
        {user && roles && !roles.includes(user.publicMetadata?.role || 'patient') ? (
          <Navigate to="/access-denied" />
        ) : (
          children
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;