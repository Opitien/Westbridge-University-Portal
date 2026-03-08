import { Settings, Globe, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  const sections = [
    {
      icon: Globe,
      title: "General",
      description: "University name, logo, and contact information",
      color: "text-secondary bg-secondary/10",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure email and push notification preferences",
      color: "text-accent bg-accent/10",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Password policies, two-factor authentication, and session settings",
      color: "text-destructive bg-destructive/10",
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Theme, branding colors, and portal customization",
      color: "text-success bg-success/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage university portal configuration.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div
            key={s.title}
            className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-soft transition-shadow cursor-pointer"
          >
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 text-center border border-border">
        <Settings className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
        <p className="text-sm text-muted-foreground">
          Detailed settings management coming soon.
        </p>
      </div>
    </div>
  );
}
