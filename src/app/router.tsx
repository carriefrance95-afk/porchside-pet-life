import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './AppLayout'
import AuthLayout from '../components/layout/AuthLayout'

function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-5xl font-semibold text-[#2D2A27]">
        Welcome to Porchside Pet Life
      </h1>
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-semibold text-[#2D2A27]">
        {title}
      </h1>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
    ],
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
    ],
  },
])