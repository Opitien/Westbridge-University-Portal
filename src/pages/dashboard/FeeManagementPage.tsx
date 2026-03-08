import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function FeeManagementPage() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [semester, setSemester] = useState("2025/2026 First");

  const { data: feeStructures = [], isLoading } = useQuery({
    queryKey: ["admin-fee-structures"],
    queryFn: async () => {
      const { data } = await supabase.from("fee_structures").select("*").order("name");
      return data || [];
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["admin-fee-payments"],
    queryFn: async () => {
      const { data } = await supabase.from("fee_payments").select("*, fee_structures(name)");
      return data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("fee_structures").insert({ name: name.trim(), amount: parseFloat(amount), semester });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-fee-structures"] });
      toast.success("Fee structure created");
      setShowCreate(false); setName(""); setAmount("");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("fee_structures").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-fee-structures"] });
      toast.success("Fee structure deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const totalStructured = feeStructures.reduce((s: number, f: any) => s + Number(f.amount), 0);
  const totalCollected = payments.filter((p: any) => p.status === "paid").reduce((s: number, p: any) => s + Number(p.amount_paid), 0);

  const pieData = [
    { name: "Collected", value: totalCollected },
    { name: "Outstanding", value: Math.max(0, totalStructured - totalCollected) },
  ];
  const COLORS = ["hsl(var(--success))", "hsl(var(--muted))"];

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage fee structures and track revenue.</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Fee Item
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {showCreate && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-card space-y-4">
              <h3 className="text-sm font-semibold text-foreground">New Fee Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Fee name" className="px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (₦)" className="px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                <input value={semester} onChange={e => setSemester(e.target.value)} placeholder="Semester" className="px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => createMutation.mutate()} disabled={!name || !amount} className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors">Create</button>
                <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground border border-border hover:bg-muted transition-colors">Cancel</button>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Fee Structures</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee Item</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Semester</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {feeStructures.map((f: any) => (
                    <tr key={f.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{f.name}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-foreground">₦{Number(f.amount).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{f.semester}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => deleteMutation.mutate(f.id)} className="p-1.5 rounded text-destructive hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Revenue chart */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-2">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(value: number) => `₦${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-center">
            <p className="text-lg font-bold text-success">₦{totalCollected.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">collected of ₦{totalStructured.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
