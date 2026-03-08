import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <ShieldX className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Access Denied</h1>
        <p className="font-body text-muted-foreground mb-6">You don't have permission to access this page.</p>
        <Link
          to="/dashboard"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
