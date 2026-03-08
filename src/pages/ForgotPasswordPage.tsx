import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-10">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src={universityCrest} alt="" className="h-9 w-9" />
            <span className="font-heading text-sm font-bold text-foreground">WestBridge University</span>
          </Link>
        </div>

        {sent ? (
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We've sent a reset link to <strong className="text-foreground">{email}</strong>.
            </p>
            <Link to="/login" className="text-xs text-primary hover:underline">
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h2 className="font-display text-xl font-bold text-foreground">Forgot password?</h2>
            <p className="text-xs text-muted-foreground mt-1 mb-6">Enter your email and we'll send a reset link.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@westbridge.edu"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>

            <p className="text-center mt-6">
              <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground">
                ← Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
