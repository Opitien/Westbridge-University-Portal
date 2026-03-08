import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, AppRole } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";
import campusImage from "@/assets/campus-login.jpg";

const roles: { key: AppRole; label: string }[] = [
  { key: "student", label: "Student" },
  { key: "lecturer", label: "Lecturer" },
  { key: "admin", label: "Admin" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AppRole>("student");
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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — image panel */}
      <div className="hidden lg:block relative">
        <img src={campusImage} alt="Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src={universityCrest} alt="" className="h-9 w-9" />
            <span className="font-heading text-sm font-bold text-white">WestBridge University</span>
          </Link>
          <div>
            <h1 className="font-heading text-3xl font-bold text-white leading-snug max-w-sm">
              Your Academic Portal
            </h1>
            <p className="text-white/50 font-body text-sm mt-2 max-w-xs">
              Access courses, results, assignments, and everything you need in one place.
            </p>
          </div>
          <p className="text-[11px] text-white/30 font-body">© 2026 WestBridge University</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={universityCrest} alt="" className="h-9 w-9" />
              <span className="font-heading text-sm font-bold text-foreground">WestBridge University</span>
            </Link>
          </div>

          <h2 className="font-display text-xl font-bold text-foreground">Sign in</h2>
          <p className="text-muted-foreground text-xs mt-1 mb-6">Enter your credentials to access your dashboard.</p>

          {/* Role tabs */}
          <div className="flex border border-border rounded-lg p-0.5 mb-6 bg-muted/50">
            {roles.map((r) => (
              <button
                type="button"
                key={r.key}
                onClick={() => setSelectedRole(r.key)}
                className={`flex-1 py-2 text-xs font-body font-medium rounded-md transition-all ${
                  selectedRole === r.key
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@westbridge.edu"
                className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-foreground">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">Register</Link>
          </p>

          <p className="text-center mt-8">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
