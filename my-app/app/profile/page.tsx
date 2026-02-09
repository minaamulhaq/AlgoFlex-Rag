"use client"

import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { Key, User, Mail, ShieldCheck, Check, Eye, EyeOff, Settings, ArrowRight, Zap, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProfilePage = () => {
    const { isLoaded, user } = useUser();
    const [apiKey, setApiKey] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { getToken } = useAuth();
    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const token = await getToken();
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/keys/get`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Fetched API Key:", response);
                if (response?.data?.success) {
                    setIsSaved(response?.data?.isKey);
                }
            } catch (error) {
                console.error("Error fetching API Key:", error);
            }
        }
        fetchApiKey();
    }, [])




    if (!isLoaded || !user) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#020617] z-[100]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                    <p className="text-slate-500 text-sm font-medium animate-pulse">Loading Profile...</p>
                </div>
            </div>
        );
    }

    const handleSaveKey = async () => {
        if (!apiKey.trim()) return;
        setIsSaving(true);
        try {
            const token = await getToken();

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/keys`,
                { openaiAPIKey: apiKey },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // setIsSaved(true);
            if (response?.data?.success) {
                setIsSaved(true);
            }
            console.log("API Key saved successfully:", response);

        } catch (error) {
            console.error("Error saving API Key:", error);
        } finally {
            setIsSaving(false);
        }
    };


    return (
        /* FIX: Using 'relative' with 'min-h-full' and removing any 'h-screen'. 
           The 'overflow-y-visible' ensures the browser handles the scroll naturally.
        */
        <div className="relative min-h-screen w-full bg-[#020617] text-slate-200 overflow-y-auto overflow-x-hidden">

            {/* Background Decorative Elements - 'fixed' so they stay behind while you scroll */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Main Content Wrapper */}
            <div className="relative z-10 w-full flex flex-col items-center py-12 px-6 md:py-24">
                <div className="w-full max-w-4xl space-y-10">

                    {/* --- Page Header --- */}
                    <header className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                            <ShieldCheck size={14} /> Account Security
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            Personal <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">Settings</span>
                        </h1>
                        <p className="text-slate-400 max-w-lg">
                            Manage your profile information, secure your data, and configure your AI workstation.
                        </p>
                    </header>

                    {/* --- Profile Section --- */}
                    <section className="bg-white/3 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-4xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <img
                                    src={user.imageUrl}
                                    alt="Profile"
                                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-[1.8rem] object-cover border border-white/10"
                                />
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">{user.firstName} {user.lastName}</h2>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-slate-400">
                                        <Mail size={16} />
                                        <span className="text-sm">{user.primaryEmailAddress?.emailAddress}</span>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-300">
                                        Active Member
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* --- API Key Section --- */}
                    {!isSaved && (
                        <section className="bg-white/3 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                            <div className="p-8 md:p-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                                        <Key size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">OpenAI Integration</h3>
                                        <p className="text-sm text-slate-500">Enter your secret key to enable AI features.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type={showKey ? "text" : "password"}
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            placeholder="sk-proj-........................"
                                            className="w-full bg-black/40 border border-white/5 text-white text-sm rounded-2xl py-5 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-black/60 transition-all font-mono"
                                        />
                                        <button
                                            onClick={() => setShowKey(!showKey)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                        >
                                            {showKey ? <EyeOff size={22} /> : <Eye size={22} />}
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-xs text-slate-500 italic">
                                            * Keys are stored securely and never exposed to third parties.
                                        </p>
                                        <button
                                            onClick={handleSaveKey}
                                            disabled={!apiKey || isSaving}
                                            className={`
                                            w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3
                                            ${isSaved
                                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                                    : "bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-1 active:translate-y-0 disabled:opacity-30"}
                                        `}
                                        >
                                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : isSaved ? <Check size={18} /> : null}
                                            {isSaved ? "Saved Successfully" : "Update Configuration"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}


                    {/* --- Extra Options for Scroll Depth --- */}
                    <div className="grid md:grid-cols-2 gap-6 pb-20">
                        <div className="p-8 rounded-4xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all cursor-pointer group">
                            <Settings className="mb-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                            <h4 className="text-lg font-bold text-white">System Preferences</h4>
                            <p className="text-sm text-slate-500 mt-2">Customise your dashboard experience and notifications.</p>
                        </div>
                        <div className="p-8 rounded-4xl bg-red-500/2 border border-red-500/10 hover:bg-red-500/5 transition-all cursor-pointer group">
                            <ShieldCheck className="mb-4 text-red-500/60" />
                            <h4 className="text-lg font-bold text-red-400">Privacy Center</h4>
                            <p className="text-sm text-slate-500 mt-2">Manage your data, sessions and account deletion.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;