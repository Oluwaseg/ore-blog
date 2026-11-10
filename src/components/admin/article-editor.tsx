"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

const toolbarButtonClassName =
  "rounded px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-800";

type ArticleEditorProps = {
  name: string;
  defaultValue?: string;
};

export function ArticleEditor({ name, defaultValue = "" }: ArticleEditorProps) {
  const [html, setHtml] = useState(defaultValue || "<p></p>");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write the article..." }),
    ],
    content: defaultValue || "<p></p>",
    onUpdate: ({ editor: currentEditor }) => {
      setHtml(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap min-h-80 px-4 py-3 text-sm outline-none [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_img]:my-4 [&_img]:max-w-full [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5",
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
      <div className="flex flex-wrap gap-1 border-b border-zinc-200 p-2 dark:border-zinc-800">
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          type="button"
        >
          Bold
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          type="button"
        >
          Italic
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          type="button"
        >
          H2
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          type="button"
        >
          H3
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          type="button"
        >
          List
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          type="button"
        >
          Numbered
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          type="button"
        >
          Quote
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          type="button"
        >
          Left
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          type="button"
        >
          Center
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => {
            const href = window.prompt("Link URL");

            if (!href) {
              return;
            }

            editor?.chain().focus().setLink({ href }).run();
          }}
          type="button"
        >
          Link
        </button>
        <button
          className={toolbarButtonClassName}
          disabled={!editor}
          onClick={() => {
            const src = window.prompt("Image URL");

            if (!src) {
              return;
            }

            editor?.chain().focus().setImage({ src }).run();
          }}
          type="button"
        >
          Image
        </button>
      </div>
      <EditorContent editor={editor} />
      <input name={name} type="hidden" value={html} />
    </div>
  );
}
