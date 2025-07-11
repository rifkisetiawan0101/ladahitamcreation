// src/components/public/Lightbox.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

type LightboxProps = {
    imageUrl: string;
    onClose: () => void;
};

export default function Lightbox({ imageUrl, onClose }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose} // Tutup jika mengklik background
        >
            <button 
                className="absolute top-4 right-4 text-white hover:text-amber-300"
                onClick={onClose}
            >
                <X size={32} />
            </button>
            <div 
                className="relative w-[90vw] h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Mencegah tutup jika mengklik gambar
            >
                <Image
                    src={imageUrl}
                    alt="Image Preview"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}