import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SignIn } from './pages/auth/sign-in';
import { Home } from './pages/app/Home';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = localStorage.getItem('username');
  if (!username) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);
