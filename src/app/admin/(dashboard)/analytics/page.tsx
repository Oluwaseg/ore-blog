import type { Metadata } from "next";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AdminAnalyticsPage() {
  return (
    <ComingSoon
      description="Article views and subscriber growth will be tracked after the public site ships."
      title="Analytics"
    />
  );
}
