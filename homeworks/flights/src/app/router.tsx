import React from "react";
import { createBrowserRouter, Navigate } from "react-router";

import AppLayout from "../components/AppLayout";
import Loader from "../components/Loader";

import AuthGuard from "../guard/AuthGuard";

import LoginPage from "../features/auth/LoginPage";

import FlightsPage from "../features/flights/pages/FlightsPage";
import FlightDetailsPage from "../features/flights/pages/FlightDetailsPage";
import BookingConfirmationPage from "../features/flights/pages/BookingConfirmationPage";

import flightsLoader from "../features/flights/loaders/flights.loader";
import flightItemLoader from "../features/flights/loaders/flightItem.loader";

import ErrorPage from "../pages/ErrorPage";

const withAuth = (node: React.ReactNode) => <AuthGuard>{node}</AuthGuard>;

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, element: <Navigate to="/flights" replace />, errorElement: <ErrorPage /> },
      { path: "login", Component: LoginPage, errorElement: <ErrorPage /> },
      {
        path: "flights",
        element: withAuth(<FlightsPage />),
        loader: flightsLoader,
        HydrateFallback: Loader,
        errorElement: <ErrorPage />
      },
      {
        path: "flights/:id",
        element: withAuth(<FlightDetailsPage />),
        loader: flightItemLoader,
        HydrateFallback: Loader,
        errorElement: <ErrorPage />
      },
      {
        path: "booking-confirmation",
        element: withAuth(<BookingConfirmationPage />),
        HydrateFallback: Loader,
        errorElement: <ErrorPage />
      },
    ],
  },
]);