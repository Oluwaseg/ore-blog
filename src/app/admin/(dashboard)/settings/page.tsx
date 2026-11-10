import type { Metadata } from "next";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return (
    <ComingSoon
      description="Publication name, metadata, and admin account settings will live here."
      title="Settings"
    />
  );
}
