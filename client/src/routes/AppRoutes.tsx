import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '@layouts/AdminLayout';
import { AuthorLayout } from '@layouts/AuthorLayout';
import { ProtectedRoute } from '@routes/ProtectedRoute';
import { RootRedirect } from '@routes/RootRedirect';
import { AdminDashboardPage } from '@pages/admin/AdminDashboardPage';
import { TicketsPage } from '@pages/admin/TicketsPage';
import TicketDetails from '@pages/admin/TicketDetails';
import { AuthorsPage } from '@pages/admin/AuthorsPage';
import BooksPage from '@pages/admin/BooksPage';
import { AuthorDashboardPage } from '@pages/author/AuthorDashboardPage';
import { AuthorTicketsPage } from '@pages/author/AuthorTicketsPage';
import { AuthorTicketDetailsPage } from '@pages/author/AuthorTicketDetailsPage';
import { CreateTicketPage } from '@pages/author/CreateTicketPage';
import { AuthorBooksPage } from '@pages/author/AuthorBooksPage';
import { AuthorProfilePage } from '@pages/author/AuthorProfilePage';
import { LoginPage } from '@pages/auth/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
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
    children: [
      { index: true, element: <AuthorDashboardPage /> },
      { path: 'tickets', element: <AuthorTicketsPage /> },
      { path: 'tickets/:ticketId', element: <AuthorTicketDetailsPage /> },
      { path: 'create-ticket', element: <CreateTicketPage /> },
      { path: 'books', element: <AuthorBooksPage /> },
      { path: 'profile', element: <AuthorProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <RootRedirect />,
  },
]);
