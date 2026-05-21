import { useState } from "react";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { uiStore } from "@/store/uiStore";
import useSWR from "swr";
import { cn } from "@/utils/cn";

export default function AdminUsersPage() {
  const pushToast = uiStore((s) => s.pushToast);
  const { data: admins, isLoading, mutate } = useSWR(endpoints.admin.admins);

  const handleDisable = async (adminId) => {
    try {
      await api.patch(endpoints.admin.disableAdmin(adminId));
      pushToast({ type: "success", message: "Admin disabled." });
      mutate();
    } catch {
      // handled
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-headline-lg tracking-tight">
        Manage Admins
      </h1>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : !admins?.length ? (
        <EmptyState
          title="No admins"
          description="No admin users found."
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium hidden sm:table-cell">
                    Role
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 text-label-sm text-text-muted font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="border-b border-border/30 hover:bg-surface-elevated/50 transition-colors"
                  >
                    <td className="px-5 py-4 text-body-sm font-medium text-text-primary">
                      {admin.name}
                    </td>
                    <td className="px-5 py-4 text-body-sm text-text-muted">
                      {admin.email}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 text-label-sm text-accent">
                        <ShieldCheck size={14} />
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex px-2.5 py-0.5 rounded-full text-label-sm font-medium border",
                          admin.isDisabled
                            ? "bg-error/10 text-error border-error/20"
                            : "bg-success/10 text-success border-success/20"
                        )}
                      >
                        {admin.isDisabled ? "Disabled" : "Active"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {!admin.isDisabled && admin.role !== "SUPER_ADMIN" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDisable(admin._id)}
                          className="text-error hover:text-error"
                        >
                          <ShieldOff size={14} />
                          Disable
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
