import React, {lazy, Suspense} from "react";
import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import TodosLayout from "../layouts/TodosLayout";

import HomeRoute from "../routes/HomeRoute";
import TodosRoute from "../routes/todos/TodosRoute";
import TodosItemRoute from "../routes/todos/TodosItemRoute";

import ErrorPage from "../pages/ErrorPage";

import todosLoader from "../routes/todos/todos.loader";
import todosItemLoader from "../routes/todos/todosItem.loader";

import Loader from "../components/Loader/Loader";

import AuthGuard from "./../guard/AuthGuard";

const AccountRouteLazy = lazy(() => import("../routes/AccountRoute"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomeRoute,
        errorElement: <ErrorPage />,
      },
      {
        path: "todos",
        Component: TodosLayout,
        children: [
          {
            index: true,
            Component: TodosRoute,
            errorElement: <ErrorPage />,
            loader: todosLoader,
            HydrateFallback: Loader,
          },
          {
            path: ":id",
            Component: TodosItemRoute,
            errorElement: <ErrorPage />,
            loader: todosItemLoader,
            HydrateFallback: Loader,
          },
        ],
      },
      {
        path: "account",
        element: (
          <AuthGuard>
            <Suspense fallback={<Loader />}>
              <AccountRouteLazy />
            </Suspense>
          </AuthGuard>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;