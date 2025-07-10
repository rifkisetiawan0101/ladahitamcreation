// src/components/public/CopyEmailButton.tsx
"use client";

import { useState } from "react";
import { Copy, Check } from 'lucide-react';

export default function CopyEmailButton({ email }: { email: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset setelah 2 detik
    };

    return (
        <button
            onClick={handleCopy}
            className="ml-2 p-1 rounded-md transition-colors hover:bg-neutral-700"
            aria-label="Copy email to clipboard"
        >
            {isCopied ? (
                <Check className="h-4 w-4 text-green-400" /> 
            ) : (
                <Copy className="h-4 w-4 text-neutral-400" />
            )}
        </button>
    );
}