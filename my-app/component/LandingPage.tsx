import React from 'react';
import { Upload, BrainCircuit, ShieldCheck, FileText, Zap, MessageSquare, ArrowRight } from 'lucide-react';
import { SignUpButton } from '@clerk/nextjs';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-slate-950 mt-10 text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
                {/* AESTHETIC GRID BACKGROUND */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f633,transparent_70%)]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-8 animate-fade-in backdrop-blur-sm">
                        <Zap size={14} className="fill-current" />
                        <span className="tracking-wide uppercase text-[10px] font-bold">New: RAG-Powered Analysis</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 px-4">
                        Chat with your <span className="text-blue-500">Documents</span> <br className="hidden md:block" /> in Seconds
                    </h1>

                    <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 px-4 leading-relaxed">
                        Turn static PDFs into an interactive knowledge base.
                        Ask questions, get instant citations, and unlock insights with our
                        advanced AI engine.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
                        <SignUpButton mode="modal">
                            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2">
                                Get Started Free <ArrowRight size={18} />
                            </button>
                        </SignUpButton>
                        <button className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 backdrop-blur-md transition-all">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-10 pb-10 relative bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Master your data</h2>
                        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Feature Cards */}
                        {[
                            {
                                icon: <Upload className="text-blue-500" />,
                                title: "Instant Indexing",
                                desc: "Upload PDFs or TXT files. Our engine processes your data in real-time for immediate querying.",
                                color: "blue"
                            },
                            {
                                icon: <BrainCircuit className="text-purple-500" />,
                                title: "Smart Context",
                                desc: "Our RAG technology ensures answers are accurate and backed by direct citations from your files.",
                                color: "purple"
                            },
                            {
                                icon: <ShieldCheck className="text-emerald-500" />,
                                title: "Secure by Design",
                                desc: "Bank-grade encryption for your documents. Your data is private and never used for training.",
                                color: "emerald"
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition-all group">
                                <div className={`w-12 h-12 bg-${feature.color}-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works - Mobile Optimized */}
            <section className="py-10 bg-slate-900/30">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-16">Simple Workflow</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-slate-800" />

                        {[
                            { icon: <FileText />, step: "1. Upload", text: "Drop your files here" },
                            { icon: <Zap />, step: "2. Process", text: "AI analyzes context" },
                            { icon: <MessageSquare />, step: "3. Chat", text: "Get instant answers" }
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 mb-6 shadow-xl">
                                    {React.cloneElement(item.icon as React.ReactElement)}
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{item.step}</h4>
                                <p className="text-slate-500">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REIMAGINED FOOTER */}

            <Footer />





        </div>
    );
};

export default LandingPage;