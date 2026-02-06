import { Outlet } from "react-router";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}