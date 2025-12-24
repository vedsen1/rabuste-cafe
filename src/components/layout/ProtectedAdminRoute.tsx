import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-brown-900">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
