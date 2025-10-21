"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { MenuBar } from "./MenuBar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RichTextEditor({ field }: { field: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] w-full max-w-none p-4 md:p-6 focus:outline-none prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : `<p>add description</p>`,
    immediatelyRender: false,
  });

  return (
    <div className="border-input bg-secondary w-full overflow-hidden rounded-lg border">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
