import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '@layouts/AdminLayout';
import { AuthorLayout } from '@layouts/AuthorLayout';
import { ProtectedRoute } from '@routes/ProtectedRoute';
import { AdminDashboardPage } from '@pages/admin/AdminDashboardPage';
import { TicketsPage } from '@pages/admin/TicketsPage';
import TicketDetails from '@pages/admin/TicketDetails';
import { AuthorsPage } from '@pages/admin/AuthorsPage';
import BooksPage from '@pages/admin/BooksPage';
import { AuthorDashboardPage } from '@pages/author/AuthorDashboardPage';
import { LoginPage } from '@pages/auth/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'tickets', element: <TicketsPage /> },
      { path: 'tickets/:id', element: <TicketDetails /> },
      { path: 'books', element: <BooksPage /> },
      { path: 'authors', element: <AuthorsPage /> },
    ],
  },
  {
    path: '/author',
    element: (
      <ProtectedRoute allowedRoles={['Author']}>
        <AuthorLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <AuthorDashboardPage /> }],
  },
]);
