import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { LoadingSpinner } from '@components/common/LoadingSpinner';

export function RootRedirect() {
  const auth = useAuth();

  if (auth?.isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = auth.user?.role?.toLowerCase();
  if (role === 'author') {
    return <Navigate to="/author" replace />;
  }

  return <Navigate to="/admin" replace />;
}
