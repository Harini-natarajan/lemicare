import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white max-w-md w-full p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6 text-gray-700">You do not have permission to view this page. Please contact your administrator if you believe this is an error.</p>
        <Link to="/" className="inline-block bg-indigo-600 text-white px-5 py-2 rounded">Go back to dashboard</Link>
      </div>
    </div>
  );
};

export default AccessDenied;