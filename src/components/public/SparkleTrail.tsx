// src/components/public/SparkleTrail.tsx
"use client";

import React, { useState, useEffect } from 'react';

// Tipe untuk setiap partikel
type Particle = {
    id: number;
    x: number;
    y: number;
    size: number;
};

const SparkleTrail = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newParticle: Particle = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 5 + 1, // Ukuran acak antara 1px dan 4px
            };

            setParticles(prev => [...prev, newParticle]);

            // Hapus partikel setelah animasinya selesai
            setTimeout(() => {
                setParticles(prev => prev.filter(p => p.id !== newParticle.id));
            }, 1000); // Durasi harus cocok dengan animasi CSS
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            {particles.map(p => (
                <div
                    key={p.id}
                    className="sparkle"
                    style={{
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                    }}
                />
            ))}
        </>
    );
};

export default SparkleTrail;