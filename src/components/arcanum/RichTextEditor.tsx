// src/components/arcanum/RichTextEditor.tsx
"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Toolbar } from './Toolbar';

type RichTextEditorProps = {
    content: string;
    onChange: (html: string) => void;
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false, // Buka link di tab baru, jangan di halaman editor
            }),
            Image.configure({
                inline: false, // Gambar sebagai blok, bukan inline
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'], // Terapkan perataan pada heading dan paragraf
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none rounded-b-md border border-t-0 border-neutral-700 bg-neutral-900 p-4 min-h-[300px] focus:outline-none',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}