// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false, // Jangan redirect otomatis, kita tangani manual
                username,
                password,
            });

            if (result?.error) {
                setError('Invalid username or password');
            } else {
                // Jika berhasil, arahkan ke dashboard
                router.push('/admin/dashboard');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-950">
            <div className="w-full max-w-md rounded-lg border border-neutral-700 bg-neutral-900 p-8 shadow-2xl shadow-amber-500/10">
                <h1 className="font-display text-center text-4xl font-bold text-amber-300">
                    Admin Login
                </h1>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-neutral-300">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-300">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full justify-center rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
