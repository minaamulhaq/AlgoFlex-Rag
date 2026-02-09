"use client";

import { useState, useEffect } from "react";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full border-b border-white/8 bg-slate-950 z-100 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group z-110">
          <div className="relative w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-blue-900/20">
            <span className="relative font-bold text-sm text-white">A</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            ALGO<span className="text-blue-500">FLEX</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <SignedOut>
              <div className="flex items-center gap-6">
                <SignInButton mode="modal">
                  <button className="text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="rounded-full bg-white px-5 py-1.5 text-[13px] font-bold text-black hover:bg-slate-200 transition-all">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 ring-2 ring-white/10 ring-offset-2 ring-offset-slate-950",
                },
              }}
            />
          </SignedIn>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-1 text-slate-400 hover:text-white z-110"
          >
            {isMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU (SOLID COLOR) ================= */}
      {/* Black Overlay (Background dimmer) */}
      <div
        className={`fixed inset-0 bg-black/90 md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
      />

      {/* Slide-out Menu - 100% Solid Background */}
      <div
        className={`fixed top-0 right-0 h-full w-70 bg-[#020617] border-l border-white/10 transition-transform duration-300 ease-in-out md:hidden z-105 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="space-y-2 mb-8">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between py-4 text-base font-semibold text-slate-200 active:text-blue-500 border-b border-white/5"
              >
                {link.name}
                <ChevronRight size={16} className="text-slate-700" />
              </Link>
            ))}
          </div>

          {/* Auth Section at the Bottom */}
          <div className="mt-auto pb-10 flex flex-col gap-3">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-900/40">
                  Get Started Free
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="w-full py-4 rounded-xl bg-slate-900 border border-white/10 text-white font-semibold text-sm">
                  Log In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-white/10">
                <span className="text-sm font-semibold text-slate-300">My Profile</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}