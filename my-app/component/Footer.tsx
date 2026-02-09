import React from 'react'
import { Twitter, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">

            <div className="container mx-auto px-6 max-w-7xl">



                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">



                    {/* Brand & Mission - Takes up 5 columns on desktop */}

                    <div className="lg:col-span-5 flex flex-col items-start">

                        <div className="flex items-center gap-2.5 mb-6 group cursor-pointer">

                            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">

                                A

                            </div>

                            <span className="text-xl font-bold tracking-tight text-white uppercase">

                                Algo<span className="text-blue-500">flex</span>

                            </span>

                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">

                            Empowering researchers and professionals with advanced RAG technology.

                            Turn complex data into actionable insights instantly.

                        </p>



                        {/* Social Links with refined hover states */}

                        <div className="flex gap-3">

                            {[

                                { Icon: Twitter, href: "#" },

                                { Icon: Github, href: "#" },

                                { Icon: Linkedin, href: "#" },

                                { Icon: Mail, href: "#" },

                            ].map((social, index) => (

                                <a

                                    key={index}

                                    href={social.href}

                                    className="w-10 h-10 bg-white/[0.03] border border-white/[0.08] rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"

                                >

                                    <social.Icon size={18} strokeWidth={1.5} />

                                </a>

                            ))}

                        </div>

                    </div>



                    {/* Links Sections - Takes up 7 columns on desktop */}

                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">



                        {/* Product Column */}

                        <div>

                            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-7">Product</h4>

                            <ul className="space-y-4">

                                {['Features', 'Pricing', 'Documentation', 'API Access'].map((item) => (

                                    <li key={item}>

                                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">

                                            {item}

                                            <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" />

                                        </a>

                                    </li>

                                ))}

                            </ul>

                        </div>



                        {/* Company Column */}

                        <div>

                            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-7">Company</h4>

                            <ul className="space-y-4">

                                {['About Us', 'Changelog', 'Careers', 'Privacy'].map((item) => (

                                    <li key={item}>

                                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">{item}</a>

                                    </li>

                                ))}

                            </ul>

                        </div>



                        {/* Support Column - Hidden on mobile, shown on SM+ */}

                        <div className="hidden sm:block">

                            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-7">Support</h4>

                            <ul className="space-y-4">

                                {['Help Center', 'Community', 'Contact', 'Status'].map((item) => (

                                    <li key={item}>

                                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">{item}</a>

                                    </li>

                                ))}

                            </ul>

                        </div>



                    </div>

                </div>



                <div className="pt-8 border-t border-white/[0.05] flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-[11px] font-medium text-slate-500 uppercase tracking-[0.2em] text-center">

                        <p>© {new Date().getFullYear()} ALGOFLEX INC.</p>

                        {/* Dot separator: Mobile pe hide hoga, desktop pe center mein dikhega */}
                        <div className="hidden md:block w-1.5 h-1.5 bg-slate-800 rounded-full" />

                        <p>Built with Precision</p>

                    </div>

                    {/* Optional: Privacy/Terms links ko bhi center mein dikhane ke liye niche add kar sakte hain */}

                </div>



            </div>

        </footer>



    )
}

export default Footer
