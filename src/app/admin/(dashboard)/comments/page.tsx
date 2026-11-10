import type { Metadata } from "next";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Comments",
};

export default function AdminCommentsPage() {
  return (
    <ComingSoon
      description="Public comments will appear here so they can be reviewed and deleted."
      title="Comments"
    />
  );
}
