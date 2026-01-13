import React, { Suspense } from "react";
import { Outlet } from "react-router";

import Loader from "../components/Loader/Loader";
import Header from "./../components/Header/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
