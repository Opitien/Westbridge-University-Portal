import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <img src={universityCrest} alt="University Crest" className="h-16 w-16 mx-auto mb-6 opacity-60" />

        <div className="relative mb-6">
          <span className="text-[120px] font-bold leading-none text-primary/10 select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-12 w-12 text-primary/40" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground text-sm mb-8">
          The page <code className="text-xs bg-muted px-2 py-0.5 rounded">{location.pathname}</code> doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
