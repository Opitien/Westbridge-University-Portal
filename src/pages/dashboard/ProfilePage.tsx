import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Mail, Phone, MapPin, Save, Building2, GraduationCap } from "lucide-react";

export default function ProfilePage() {
  const { user, role } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || user?.user_metadata?.full_name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setDepartment(profile.department || "");
      setFaculty(profile.faculty || "");
      setMatricNumber(profile.matric_number || "");
      setLevel(profile.level || "");
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          address: address.trim() || null,
          department: department.trim() || null,
          faculty: faculty.trim() || null,
          matric_number: matricNumber.trim() || null,
          level: level.trim() || null,
        })
        .eq("user_id", user!.id);
      if (error) throw error;
      await supabase.auth.updateUser({ data: { full_name: fullName.trim() } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-xl" />;

  const fields = [
    { label: "Full Name", value: fullName, set: setFullName, icon: User, type: "text" },
    { label: "Email", value: user?.email || "", set: () => {}, icon: Mail, type: "email", disabled: true },
    { label: "Phone", value: phone, set: setPhone, icon: Phone, type: "tel", placeholder: "+234 xxx xxx xxxx" },
    { label: "Matric Number", value: matricNumber, set: setMatricNumber, icon: GraduationCap, type: "text", placeholder: "e.g. CSC/2023/001" },
    { label: "Department", value: department, set: setDepartment, icon: Building2, type: "text" },
    { label: "Faculty", value: faculty, set: setFaculty, icon: Building2, type: "text" },
    { label: "Level", value: level, set: setLevel, icon: GraduationCap, type: "text", placeholder: "e.g. 300" },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">View and update your personal information.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 p-6 flex items-center gap-4 border-b border-border">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{fullName || "User"}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {fields.map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
              <div className="relative">
                <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={f.type}
                  value={f.value}
                  onChange={e => f.set(e.target.value)}
                  disabled={f.disabled}
                  placeholder={f.placeholder}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${f.disabled ? "bg-muted text-muted-foreground" : "bg-background"}`}
                />
              </div>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={3}
                placeholder="Enter your address"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>
          <button
            onClick={() => updateMutation.mutate()}
            disabled={updateMutation.isPending}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
