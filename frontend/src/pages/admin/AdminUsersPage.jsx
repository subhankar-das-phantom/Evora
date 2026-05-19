import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Plus, ShieldAlert, ShieldCheck } from "lucide-react";
import { api, fetcher } from "@/api/axios";
import { authStore } from "@/store/authStore";
import { uiStore } from "@/store/uiStore";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminUsersPage() {
  const { data: adminsData, isLoading } = useSWR("/admin/users/admins", fetcher);
  const user = authStore((s) => s.user);
  const pushToast = uiStore((s) => s.pushToast);
  
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const [isAppointModalOpen, setIsAppointModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const admins = adminsData || [];

  const handleAppointSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/admin/users/admins", formData);
      pushToast({ type: "success", message: "Admin appointed successfully." });
      setIsAppointModalOpen(false);
      setFormData({ name: "", email: "", password: "" });
      mutate("/admin/users/admins");
    } catch (error) {
      // Interceptor handles the error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { 
      header: "Role", 
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-evora-primary/10 px-2.5 py-0.5 text-xs font-semibold text-evora-primary">
          {row.role === "SUPER_ADMIN" ? <ShieldAlert className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
          {row.role.replace("_", " ")}
        </span>
      )
    },
    { 
      header: "Status", 
      render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          row.isActive !== false ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        }`}>
          {row.isActive !== false ? "Active" : "Disabled"}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-evora-text-primary">Manage Admins</h1>
          <p className="mt-1 text-sm text-evora-text-secondary">View and manage administrative access to the platform.</p>
        </div>
        
        {isSuperAdmin && (
          <Button onClick={() => setIsAppointModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Appoint Admin
          </Button>
        )}
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DataTable columns={columns} data={admins} keyField="_id" />
      )}

      {isSuperAdmin && (
        <Modal
          isOpen={isAppointModalOpen}
          onClose={() => setIsAppointModalOpen(false)}
          title="Appoint New Admin"
        >
          <form onSubmit={handleAppointSubmit} className="space-y-4">
            <Input 
              label="Full Name" 
              placeholder="e.g. Jane Doe"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input 
              label="Email Address" 
              type="email"
              placeholder="jane@evora.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="space-y-1">
              <Input 
                label="Temporary Password" 
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-xs text-evora-text-muted">
                The appointed admin will be forced to reset this password upon their first login.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsAppointModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Appointing..." : "Appoint Admin"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
