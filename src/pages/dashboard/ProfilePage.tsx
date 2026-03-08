import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });
    setSaving(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Profile</h1>
        <p className="font-body text-muted-foreground text-sm">View and update your personal information.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
        <div className="bg-primary/5 p-6 flex items-center gap-4 border-b border-border">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-foreground">{fullName || "Student"}</p>
            <p className="font-body text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-muted font-body text-sm text-muted-foreground"
              />
            </div>
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+234 xxx xxx xxxx"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={3}
                placeholder="Enter your address"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
