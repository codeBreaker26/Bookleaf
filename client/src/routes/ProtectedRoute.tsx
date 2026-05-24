// import { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@hooks/useAuth';

// interface ProtectedRouteProps {
//   allowedRoles: string[];
//   children: ReactNode;
// }

// export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
//   const auth = useAuth();

//   if (!auth.isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   const hasRole = auth.user?.role && allowedRoles.includes(auth.user.role);

//   if (!hasRole) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// }


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { getAuthToken } from '@utils/storage';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const auth = useAuth();
  // While auth is initializing (checking token), render a spinner to avoid
  // an immediate redirect flash when login is in-progress or token is being validated.
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

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = auth.user?.role?.toString().toLowerCase() ?? '';
    const hasRole = allowedRoles.some((role) => role.toLowerCase() === userRole);
    if (!hasRole) {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}