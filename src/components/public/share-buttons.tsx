"use client";

import { useEffect, useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) {
    return null;
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <a
        className="underline-offset-4 hover:underline"
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        rel="noreferrer"
        target="_blank"
      >
        Share on X
      </a>
      <a
        className="underline-offset-4 hover:underline"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        rel="noreferrer"
        target="_blank"
      >
        Facebook
      </a>
      <a
        className="underline-offset-4 hover:underline"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        rel="noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <button
        className="underline-offset-4 hover:underline"
        onClick={() => navigator.clipboard.writeText(url)}
        type="button"
      >
        Copy link
      </button>
    </div>
  );
}
