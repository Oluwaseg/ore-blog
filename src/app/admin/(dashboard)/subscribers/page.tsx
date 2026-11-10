import type { Metadata } from "next";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Subscribers",
};

export default function AdminSubscribersPage() {
  return (
    <ComingSoon
      description="Newsletter subscriber management will be added with email delivery."
      title="Subscribers"
    />
  );
}
