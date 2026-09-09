"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
    Bold,
    Italic,
    Strikethrough,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Minus,
    Undo2,
    Redo2,
} from "lucide-react";

interface RichTextEditorProps {
    content?: string;
    onChange?: (content: string) => void;
}

export default function RichTextEditor({
    content = "",
    onChange,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
            }),
        ],

        content,

        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },

        immediatelyRender: false,
    });

    useEffect(() => {
        if (!editor) return;

        const currentContent = editor.getHTML();

        if (currentContent !== content) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    const buttonClass = (active = false) =>
        `
        flex h-9 w-9 items-center justify-center
        rounded-md transition-colors
        hover:bg-gray-100
        disabled:cursor-not-allowed
        disabled:opacity-40
        ${active ? "bg-gray-100 text-emerald-600" : "text-gray-600"}
        `;

    return (
        <div
            dir="rtl"
            className="overflow-hidden rounded-xl border border-gray-300 bg-white"
        >
            {/* Toolbar */}
            <div
                dir="rtl"
                className="
                    flex flex-wrap items-center gap-1
                    border-b border-gray-200
                    bg-gray-50 p-2
                "
            >
                {/* Bold */}
                <button
                    type="button"
                    title="پررنگ"
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    disabled={
                        !editor
                            .can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={buttonClass(editor.isActive("bold"))}
                >
                    <Bold size={18} />
                </button>

                {/* Italic */}
                <button
                    type="button"
                    title="کج"
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    disabled={
                        !editor
                            .can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={buttonClass(editor.isActive("italic"))}
                >
                    <Italic size={18} />
                </button>

                {/* Strikethrough */}
                <button
                    type="button"
                    title="خط خورده"
                    onClick={() =>
                        editor.chain().focus().toggleStrike().run()
                    }
                    disabled={
                        !editor
                            .can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={buttonClass(editor.isActive("strike"))}
                >
                    <Strikethrough size={18} />
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300" />

                {/* Heading 2 */}
                <button
                    type="button"
                    title="عنوان بزرگ"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                    className={buttonClass(
                        editor.isActive("heading", { level: 2 })
                    )}
                >
                    <Heading2 size={18} />
                </button>

                {/* Heading 3 */}
                <button
                    type="button"
                    title="عنوان متوسط"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                    className={buttonClass(
                        editor.isActive("heading", { level: 3 })
                    )}
                >
                    <Heading3 size={18} />
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300" />

                {/* Bullet List */}
                <button
                    type="button"
                    title="لیست نقطه‌ای"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={buttonClass(
                        editor.isActive("bulletList")
                    )}
                >
                    <List size={18} />
                </button>

                {/* Ordered List */}
                <button
                    type="button"
                    title="لیست شماره‌ای"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={buttonClass(
                        editor.isActive("orderedList")
                    )}
                >
                    <ListOrdered size={18} />
                </button>

                {/* Blockquote */}
                <button
                    type="button"
                    title="نقل قول"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={buttonClass(
                        editor.isActive("blockquote")
                    )}
                >
                    <Quote size={18} />
                </button>

                {/* Horizontal Rule */}
                <button
                    type="button"
                    title="خط جداکننده"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                    className={buttonClass()}
                >
                    <Minus size={18} />
                </button>

                <div className="mx-1 h-6 w-px bg-gray-300" />

                {/* Undo */}
                <button
                    type="button"
                    title="برگشت"
                    onClick={() =>
                        editor.chain().focus().undo().run()
                    }
                    disabled={!editor.can().undo()}
                    className={buttonClass()}
                >
                    <Undo2 size={18} />
                </button>

                {/* Redo */}
                <button
                    type="button"
                    title="جلو رفتن"
                    onClick={() =>
                        editor.chain().focus().redo().run()
                    }
                    disabled={!editor.can().redo()}
                    className={buttonClass()}
                >
                    <Redo2 size={18} />
                </button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="tiptap min-h-60 px-4 py-3 text-right outline-none
                "
            />
        </div>
    );
}