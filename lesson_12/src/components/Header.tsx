import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuthStore } from "../features/auth/auth.store";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthed, logout } = useAuthStore();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-10 bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link to={isAuthed ? "/concerts" : "/login"} className="flex items-center gap-2">
          <span className="text-lg">🎹</span>
          <span className="font-semibold">Concert Booker</span>
        </Link>

        <nav className="flex items-center gap-3">
          {isAuthed && (
            <>
              <Link to="/concerts" className="text-sm underline">
                Concerts
              </Link>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
        </nav>
      </div>
      <Separator />
    </header>
  );
}