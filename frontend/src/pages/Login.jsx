import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn path="/login" routing="path" afterSignInUrl="/auth-callback" signUpUrl="/register" />
    </div>
  );
};

export default Login;