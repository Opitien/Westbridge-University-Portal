import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreditCard, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function FeesPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: feeStructures = [] } = useQuery({
    queryKey: ["fee-structures"],
    queryFn: async () => {
      const { data } = await supabase.from("fee_structures").select("*").order("name");
      return data || [];
    },
  });

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-fee-payments"],
    queryFn: async () => {
      const { data } = await supabase
        .from("fee_payments")
        .select("*, fee_structures(name, amount)")
        .eq("student_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const payMutation = useMutation({
    mutationFn: async (feeStructureId: string) => {
      const fee = feeStructures.find((f: any) => f.id === feeStructureId);
      if (!fee) throw new Error("Fee not found");
      const { error } = await supabase.from("fee_payments").insert({
        student_id: user!.id,
        fee_structure_id: feeStructureId,
        amount_paid: fee.amount,
        status: "paid",
        payment_reference: `PAY-${Date.now()}`,
        paid_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-fee-payments"] });
      toast.success("Payment recorded successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const paidFeeIds = new Set(payments.filter((p: any) => p.status === "paid").map((p: any) => p.fee_structure_id));
  const totalFees = feeStructures.reduce((s: number, f: any) => s + Number(f.amount), 0);
  const totalPaid = feeStructures.filter((f: any) => paidFeeIds.has(f.id)).reduce((s: number, f: any) => s + Number(f.amount), 0);
  const balance = totalFees - totalPaid;

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-xl" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Fees & Payments</h1>
        <p className="text-muted-foreground text-sm mt-1">View your fee breakdown and make payments.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
            <CreditCard className="h-5 w-5 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">₦{totalFees.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Fees</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center mb-3">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">₦{totalPaid.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Amount Paid</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className={`h-10 w-10 rounded-lg ${balance > 0 ? "bg-destructive/10" : "bg-success/10"} flex items-center justify-center mb-3`}>
            {balance > 0 ? <AlertCircle className="h-5 w-5 text-destructive" /> : <CheckCircle className="h-5 w-5 text-success" />}
          </div>
          <p className={`text-2xl font-bold ${balance > 0 ? "text-destructive" : "text-success"}`}>₦{balance.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Outstanding Balance</p>
        </div>
      </div>

      {/* Fee breakdown */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Fee Breakdown — 2025/2026 First Semester</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee Item</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {feeStructures.map((fee: any) => {
                const isPaid = paidFeeIds.has(fee.id);
                return (
                  <tr key={fee.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{fee.name}</td>
                    <td className="px-4 py-3 text-sm text-right text-foreground font-semibold">₦{Number(fee.amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/10 text-success">
                          <CheckCircle className="h-3 w-3" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isPaid && (
                        <button
                          onClick={() => payMutation.mutate(fee.id)}
                          disabled={payMutation.isPending}
                          className="px-3 py-1.5 rounded-md text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
