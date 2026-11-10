import type { Metadata } from "next";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Media",
};

export default function AdminMediaPage() {
  return (
    <ComingSoon
      description="Cloudinary uploads and the media library will be added next."
      title="Media"
    />
  );
}
