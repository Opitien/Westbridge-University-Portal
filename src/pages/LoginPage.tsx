import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { GraduationCap, ArrowRight, Eye, EyeOff } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-hero-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <img src={universityCrest} alt="Grand University" className="h-14 w-14" />
          </Link>
          <h1 className="font-display text-3xl font-bold text-primary-foreground">Sign In</h1>
          <p className="font-body text-primary-foreground/60 mt-1">Access your university portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 shadow-elevated border border-border space-y-5">
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@granduniversity.edu"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 pr-10"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"} <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center space-y-2">
            <Link to="/forgot-password" className="font-body text-xs text-accent hover:underline block">
              Forgot password?
            </Link>
            <p className="font-body text-xs text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent hover:underline">Apply here</Link>
            </p>
          </div>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
