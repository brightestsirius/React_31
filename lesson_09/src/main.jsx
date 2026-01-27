import { createRoot } from "react-dom/client";
import "./index.sass";
import App from "./App.jsx";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./app/providers/QueryProvider.js";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
