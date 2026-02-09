"use client"

import { useState, useEffect } from "react";
import { PanelLeftClose, PanelLeftOpen, Files, History, Settings, X } from "lucide-react";
import Chat from "@/component/Chat";
import FileUpload from "@/component/FileUpload";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  // Logic: Responsive initial state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="h-[calc(100vh-64px)] flex w-full bg-slate-950 text-slate-200 overflow-hidden relative">

      {/* --- Mobile Backdrop (Solid Overlay) --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-60 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar (Solid Matte Finish) --- */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-70
          transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          border-r border-white/8 bg-[#020617] flex flex-col
          ${isSidebarOpen ? "w-70 sm:w-[320px] translate-x-0" : "w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden"}
        `}
      >
        <div className="p-6 flex flex-col h-full min-w-70 sm:min-w-[320px]">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Files size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Workspace</span>
            </div>
            {/* Unified Close Button for both Mobile & Desktop Sidebar */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          <div className="mb-8">
            <FileUpload setFileName={setFileName} />
          </div>

          <nav className="space-y-1.5 flex-1 overflow-y-auto">
            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 px-2">
              Recent Activity
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-400 cursor-pointer hover:bg-blue-500/10 transition-all">
              <History size={15} />
              <span className="text-xs font-medium truncate">Current Session</span>
            </div>
          </nav>

          <div className="pt-4 border-t border-white/5">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all">
              <Settings size={15} />
              <span className="text-xs font-medium">Preferences</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Chat Area --- */}
      <section className="flex-1 flex flex-col relative min-w-0 h-full">

        {/* Floating Sidebar Trigger (Visible only when sidebar is CLOSED) */}
        {!isSidebarOpen && (
          <div className="absolute top-4 left-4 z-55">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-xl bg-[#020617] border border-white/10 text-slate-400 hover:text-blue-500 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              <PanelLeftOpen size={20} />
            </button>
          </div>
        )}

        {/* Chat Component container */}
        <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
          <Chat fileName={fileName} />
        </div>
      </section>
    </main>
  );
}