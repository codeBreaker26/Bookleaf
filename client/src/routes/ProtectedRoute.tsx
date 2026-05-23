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


import React from "react";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}