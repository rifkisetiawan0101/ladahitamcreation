// src/components/admin/ImageUpload.tsx
"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type ImageUploadProps = {
    onUploadComplete: (url: string) => void;
};

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        setUploading(true);
        try {
            const fileName = `${Date.now()}_${file.name}`;
            const { error } = await supabase.storage
                .from('ladahitam-assets') // Nama bucket Anda
                .upload(fileName, file);

            if (error) throw error;

            // Dapatkan URL publik dari gambar yang baru di-upload
            const { data: { publicUrl } } = supabase.storage
                .from('ladahitam-assets')
                .getPublicUrl(fileName);
            
            onUploadComplete(publicUrl); // Kirim URL ke komponen induk
            alert("Upload successful!");

        } catch (error: unknown) {
            console.error("Error uploading file:", error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred during upload.");
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 disabled:bg-neutral-500"
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
}