import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, CheckCircle, XCircle, Clock, Search } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AdmissionsManagementPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data: admissions = [], isLoading } = useQuery({
    queryKey: ["admin-admissions"],
    queryFn: async () => {
      const { data } = await supabase.from("admissions").select("*").order("application_date", { ascending: false });
      return data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("admissions").update({
        status,
        reviewed_by: user!.id,
        reviewed_at: new Date().toISOString(),
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-admissions"] });
      toast.success("Application updated");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const filtered = admissions
    .filter((a: any) => filter === "all" || a.status === filter)
    .filter((a: any) => (a.applicant_name || "").toLowerCase().includes(search.toLowerCase()));

  const statusCounts = {
    all: admissions.length,
    pending: admissions.filter((a: any) => a.status === "pending").length,
    approved: admissions.filter((a: any) => a.status === "approved").length,
    rejected: admissions.filter((a: any) => a.status === "rejected").length,
  };

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-xl" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Admissions Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage admission applications.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map(status => (
          <button key={status} onClick={() => setFilter(status)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === status ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
          </button>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applicant..." className="bg-transparent text-xs text-foreground outline-none w-32" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applicant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Program</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">JAMB</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((a: any) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{a.applicant_name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{a.email}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{a.program}</td>
                  <td className="px-4 py-3 text-center text-sm font-medium text-foreground">{a.jamb_score}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      a.status === "approved" ? "bg-success/10 text-success" :
                      a.status === "rejected" ? "bg-destructive/10 text-destructive" :
                      "bg-accent/10 text-accent"
                    }`}>
                      {a.status === "approved" ? <CheckCircle className="h-3 w-3" /> : a.status === "rejected" ? <XCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {a.status === "pending" && (
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => updateMutation.mutate({ id: a.id, status: "approved" })} className="px-2 py-1 rounded text-xs font-semibold text-success bg-success/10 hover:bg-success/20 transition-colors">Approve</button>
                        <button onClick={() => updateMutation.mutate({ id: a.id, status: "rejected" })} className="px-2 py-1 rounded text-xs font-semibold text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
