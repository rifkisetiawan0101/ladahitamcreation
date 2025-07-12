"use client";

import { type Editor } from '@tiptap/react';
import { 
    Bold, Italic, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, 
    Image as ImageIcon, Heading1, Heading2, Heading3, Baseline
} from 'lucide-react';
import ImageUpload from './ImageUpload';
import { useState, useCallback } from 'react';

type ToolbarProps = {
    editor: Editor;
};

export const Toolbar = ({ editor }: ToolbarProps) => {
    const [showImageUpload, setShowImageUpload] = useState(false);

    const addImage = (url: string) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
            setShowImageUpload(false);
        }
    };
    
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2 rounded-t-md border border-neutral-700 bg-neutral-800 p-2">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <Bold className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <Italic className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <Baseline className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <Heading1 className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <Heading2 className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <Heading3 className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <AlignLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <AlignCenter className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <AlignRight className="h-5 w-5" />
            </button>
            <button type="button" onClick={setLink} className={editor.isActive('link') ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <LinkIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setShowImageUpload(!showImageUpload)} className={showImageUpload ? 'bg-amber-400 text-neutral-900 p-1 rounded' : 'p-1'}>
                <ImageIcon className="h-5 w-5" />
            </button>

            {showImageUpload && (
                <div className="w-full mt-2 p-2 border-t border-neutral-700">
                    <ImageUpload onUploadComplete={addImage} />
                </div>
            )}
        </div>
    );
};