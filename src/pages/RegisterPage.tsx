import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Check your email for verification.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-hero-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src={universityCrest} alt="Grand University" className="h-14 w-14 mx-auto" />
          </Link>
          <h1 className="font-display text-3xl font-bold text-primary-foreground">Create Account</h1>
          <p className="font-body text-primary-foreground/60 mt-1">Register as a prospective student</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 shadow-elevated border border-border space-y-5">
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
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
                placeholder="Min. 6 characters"
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
            {isLoading ? "Creating..." : "Create Account"} <ArrowRight className="h-4 w-4" />
          </button>
          <p className="font-body text-xs text-muted-foreground text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">Sign in</Link>
          </p>
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
