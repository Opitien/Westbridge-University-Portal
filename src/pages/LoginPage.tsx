import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, GraduationCap, BookOpenCheck, ShieldCheck, Users } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";
import campusImage from "@/assets/campus-login.jpg";

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

  const portalLinks = [
    { icon: GraduationCap, label: "Student Portal", desc: "Access courses, results & fees" },
    { icon: BookOpenCheck, label: "Lecturer Portal", desc: "Manage classes & grading" },
    { icon: ShieldCheck, label: "Admin Portal", desc: "University administration" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel with campus image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={campusImage} alt="Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={universityCrest} alt="Westbridge University" className="h-12 w-12" />
              <div>
                <h2 className="font-heading text-xl font-bold text-primary-foreground">Westbridge University</h2>
                <p className="text-primary-foreground/60 text-sm">Excellence in Education</p>
              </div>
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground">
                Your Academic Journey<br />Starts Here
              </h1>
              <p className="text-primary-foreground/70 text-lg max-w-md mt-4">
                Access course registration, results, assignments, and everything you need — all in one portal.
              </p>
            </div>

            {/* Portal type cards */}
            <div className="grid grid-cols-3 gap-3">
              {portalLinks.map((p) => (
                <div key={p.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                  <p.icon className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm font-semibold text-primary-foreground">{p.label}</p>
                  <p className="text-xs text-primary-foreground/50 mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold text-accent">3,200+</p>
                <p className="text-sm text-primary-foreground/60">Students</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">180+</p>
                <p className="text-sm text-primary-foreground/60">Faculty</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">120+</p>
                <p className="text-sm text-primary-foreground/60">Courses</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-primary-foreground/40">© 2026 Westbridge University. All rights reserved.</p>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img src={universityCrest} alt="Westbridge University" className="h-12 w-12" />
            </Link>
            <h1 className="font-heading text-2xl font-bold text-foreground">Westbridge University</h1>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Sign in to your portal</h2>
            <p className="text-muted-foreground text-sm mt-1">Enter your credentials to access your dashboard</p>
          </div>

          {/* Role quick-access pills (mobile) */}
          <div className="lg:hidden flex gap-2 mb-6">
            {portalLinks.map((p) => (
              <div key={p.label} className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted text-center">
                <p.icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-medium text-foreground leading-tight">{p.label.replace(" Portal", "")}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@westbridge.edu"
                className="w-full px-4 py-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors pr-10"
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
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"} <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-center space-y-2 pt-2">
              <Link to="/forgot-password" className="text-xs text-secondary hover:underline block">
                Forgot password?
              </Link>
              <p className="text-xs text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-secondary hover:underline font-medium">Apply here</Link>
              </p>
            </div>
          </form>

          <p className="text-center mt-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
