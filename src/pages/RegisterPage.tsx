import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, GraduationCap, BookOpenCheck, ShieldCheck } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";
import campusImage from "@/assets/campus-login.jpg";

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

  const portalLinks = [
    { icon: GraduationCap, label: "Student", desc: "Course registration & results" },
    { icon: BookOpenCheck, label: "Lecturer", desc: "Teaching & grading" },
    { icon: ShieldCheck, label: "Admin", desc: "University management" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={campusImage} alt="Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={universityCrest} alt="Westbridge University" className="h-12 w-12" />
            <div>
              <h2 className="font-heading text-xl font-bold text-primary-foreground">Westbridge University</h2>
              <p className="text-primary-foreground/60 text-sm">Excellence in Education</p>
            </div>
          </Link>

          <div className="space-y-6">
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground">
              Join Our Academic<br />Community
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-md">
              Create your account to access the student portal and begin your academic journey with us.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {portalLinks.map((p) => (
                <div key={p.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                  <p.icon className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm font-semibold text-primary-foreground">{p.label}</p>
                  <p className="text-xs text-primary-foreground/50 mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-primary-foreground/40">© 2026 Westbridge University. All rights reserved.</p>
        </div>
      </div>

      {/* Right register panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img src={universityCrest} alt="Westbridge University" className="h-14 w-14 mx-auto" />
            </Link>
            <h1 className="font-heading text-2xl font-bold text-foreground">Westbridge University</h1>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Create your account</h2>
            <p className="text-muted-foreground text-sm mt-1">Register as a prospective student</p>
          </div>

          {/* Role pills (mobile) */}
          <div className="lg:hidden flex gap-2 mb-6">
            {portalLinks.map((p) => (
              <div key={p.label} className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted text-center">
                <p.icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-medium text-foreground leading-tight">{p.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
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
                  placeholder="Min. 6 characters"
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
              {isLoading ? "Creating..." : "Create Account"} <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-secondary hover:underline font-medium">Sign in</Link>
            </p>
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
