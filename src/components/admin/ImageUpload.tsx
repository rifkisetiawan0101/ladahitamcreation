"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UploadCloud } from 'lucide-react';

type ImageUploadProps = {
    onUploadComplete: (urls: string[]) => void;
    multiple?: boolean;
    uploadPath: string;
};

export default function ImageUpload({ onUploadComplete, multiple = false, uploadPath  }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) {
            alert("Please select one or more files first.");
            return;
        }

        setUploading(true);
        const uploadedUrls: string[] = [];

        try {
            for (const file of Array.from(files)) {
                const filePath = `${uploadPath}/${file.name}`;

                const { error } = await supabase.storage
                    .from('ladahitam-assets')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: true // <-- true: Timpa file jika namanya sama.
                    });

                if (error) {
                    throw new Error(`Failed to upload ${file.name}: ${error.message}`);
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('ladahitam-assets')
                    .getPublicUrl(filePath);
                
                uploadedUrls.push(publicUrl);
            }
            
            onUploadComplete(uploadedUrls);
            alert(`${uploadedUrls.length} file(s) uploaded successfully!`);

        } catch (error: unknown) {
            console.error("Error uploading files:", error);
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
        <div className="rounded-lg border border-dashed border-neutral-600 p-4">
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    accept="image/*"
                    multiple={multiple} // Menggunakan prop untuk mengontrol ini
                    onChange={handleFileChange}
                    className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
                />
                <button
                    onClick={handleUpload}
                    disabled={uploading || !files}
                    className="flex items-center flex-shrink-0 bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 disabled:bg-neutral-500"
                >
                    <UploadCloud className="h-5 w-5 mr-2" />
                    {uploading ? 'Uploading...' : `Upload`}
                </button>
            </div>
        </div>
    );
}