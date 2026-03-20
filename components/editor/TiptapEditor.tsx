"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";

interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-sm transition-colors ${
        active
          ? "bg-amber-700/40 text-amber-200"
          : "text-amber-500/70 hover:bg-amber-900/30 hover:text-amber-300"
      }`}
    >
      {children}
    </button>
  );
}

export default function TiptapEditor({
  content = "",
  onChange,
  editable = true,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Typography],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none font-serif text-amber-100 prose-headings:text-amber-200 prose-p:text-amber-300/80 prose-strong:text-amber-200 prose-em:text-amber-400/80 prose-ul:text-amber-300/80 prose-ol:text-amber-300/80 prose-blockquote:border-amber-700 prose-blockquote:text-amber-400/70 prose-code:text-amber-300 prose-code:bg-amber-900/30",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-amber-800/30 rounded-lg overflow-hidden bg-amber-950/20">
      {/* Toolbar */}
      {editable && (
        <div className="flex flex-wrap gap-1 p-2 border-b border-amber-800/20 bg-amber-950/30">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            B
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            I
          </ToolbarButton>
          <div className="w-px bg-amber-800/20 mx-1" />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            H3
          </ToolbarButton>
          <div className="w-px bg-amber-800/20 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            • List
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Quote"
          >
            "Quote"
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            {"</>"}
          </ToolbarButton>
          <div className="w-px bg-amber-800/20 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            ↩
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            ↪
          </ToolbarButton>
        </div>
      )}

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
