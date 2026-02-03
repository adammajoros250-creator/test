import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/mangaverse-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background noise">
      <div className="text-center glass p-12 rounded-2xl max-w-md">
        <img src={logo} alt="MangaVerse" className="h-16 w-auto mx-auto mb-6" />
        <h1 className="mb-4 text-6xl font-display font-bold gradient-text">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="px-8 py-3 rounded-xl font-semibold gradient-primary text-primary-foreground glow-primary inline-block transition-transform hover:scale-105">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
