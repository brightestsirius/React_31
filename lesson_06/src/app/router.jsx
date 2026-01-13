import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import RootLayout from "../routes/RootLayout";
import TodosLayout from "../routes/todos/layout";

import HomeRoute from "../routes/HomeRoute";
import TodosRoute from "../routes/todos/index.route";
import TodoItemRoute from "../routes/todos/item.route";

import todosLoader from "../routes/todos/todos.loader";
import todoItemLoader from "../routes/todos/item.loader";

import Loader from "../components/Loader/Loader";
import ErrorPage from "../pages/ErrorPage";

import AuthGuard from "../guards/AuthGuard";

const AccountRouteLazy = lazy(() => import("../routes/AccountRount"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
            Component: TodoItemRoute,
            errorElement: <ErrorPage />,
            loader: todoItemLoader,
            HydrateFallback: Loader,
          },
        ],
      },
      {
        path: "/account",
        Component: () => (
          <AuthGuard>
            <AccountRouteLazy />
          </AuthGuard>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
