import { SignUp } from '@clerk/clerk-react';

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUp path="/register" routing="path" afterSignUpUrl="/auth-callback" signInUrl="/login" />
    </div>
  );
};

export default Register;