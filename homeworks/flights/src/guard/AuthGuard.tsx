import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../features/auth/auth.store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}