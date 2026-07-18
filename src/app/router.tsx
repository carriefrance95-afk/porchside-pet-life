import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom';

import AppLayout from './AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import CreateAccountPage from '../features/auth/CreateAccountPage';
import SignInPage from '../features/auth/SignInPage';
import VerifyEmailPage from '../features/auth/VerifyEmailPage';
import { useAuth } from '../features/auth/useAuth';
import WelcomePage from '../pages/WelcomePage';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream-100)] px-6">
      <h1 className="psl-section-title text-center">
        {title}
      </h1>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream-100)] px-6">
      <div className="text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-border-soft)] border-t-[var(--color-terracotta-500)]"
        />

        <p className="text-base font-medium text-[var(--color-charcoal-900)]">
          Opening the door...
        </p>
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

function PublicOnlyRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/porch" replace />;
  }

  return <Outlet />;
}

function NotFoundPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Navigate to={user ? '/porch' : '/'} replace />;
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: '/create-account',
            element: <CreateAccountPage />,
          },
          {
            path: '/sign-in',
            element: <SignInPage />,
          },
          {
            path: '/forgot-password',
            element: <PlaceholderPage title="Reset Your Password" />,
          },
        ],
      },
      {
        path: '/verify-email',
        element: <VerifyEmailPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/onboarding/about-you',
        element: <PlaceholderPage title="About You" />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: '/porch',
            element: <PlaceholderPage title="Your Porch" />,
          },
          {
            path: '/dogs',
            element: <PlaceholderPage title="My Dogs" />,
          },
          {
            path: '/reminders',
            element: <PlaceholderPage title="Calendar & Reminders" />,
          },
          {
            path: '/directory',
            element: <PlaceholderPage title="Care Directory" />,
          },
          {
            path: '/emergency',
            element: <PlaceholderPage title="Emergency" />,
          },
          {
            path: '/resources',
            element: <PlaceholderPage title="Resources" />,
          },
          {
            path: '/account',
            element: <PlaceholderPage title="Account" />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);