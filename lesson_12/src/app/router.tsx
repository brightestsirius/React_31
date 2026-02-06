import { createBrowserRouter, Navigate } from "react-router";

import AppLayout from "../components/AppLayout";
import Loader from "../components/Loader";
import ErrorPage from "../pages/ErrorPage";

import AuthGuard from "../guard/AuthGuard";

import LoginPage from "../features/auth/LoginPage";

import ConcertsPage from "../features/concerts/pages/ConcertsPage";
import ConcertDetailsPage from "../features/concerts/pages/ConcertDetailsPage";
import BookingConfirmationPage from "../features/concerts/pages/BookingConfirmationPage";

import concertsLoader from "../features/concerts/loaders/concerts.loader";
import concertItemLoader from "../features/concerts/loaders/concertItem.loader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/concerts" replace />,
      },

      {
        path: "login",
        Component: LoginPage,
        errorElement: <ErrorPage />,
      },

      {
        path: "concerts",
        element: (
          <AuthGuard>
            <ConcertsPage />
          </AuthGuard>
        ),
        loader: concertsLoader,
        HydrateFallback: Loader,
        errorElement: <ErrorPage />,
      },

      {
        path: "concerts/:id",
        element: (
          <AuthGuard>
            <ConcertDetailsPage />
          </AuthGuard>
        ),
        loader: concertItemLoader,
        HydrateFallback: Loader,
        errorElement: <ErrorPage />,
      },

      {
        path: "booking-confirmation",
        element: (
          <AuthGuard>
            <BookingConfirmationPage />
          </AuthGuard>
        ),
        HydrateFallback: Loader,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <Navigate to="/concerts" replace />,
      },
    ],
  },
]);

export default router;