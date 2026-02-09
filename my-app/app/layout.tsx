import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/component/Header'
import LandingPage from '@/component/LandingPage'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DocuMind | AI PDF Analyzer',
  description: 'Analyze your documents with ease',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      {/* 1. 'h-full' ko html se hata sakte hain ya 'min-h-screen' use karein */}
      <html lang="en" className="min-h-screen">
        {/* 2. Body se 'h-full' hata kar 'min-h-screen' lagaya taaki page grow kar sake */}
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 flex flex-col text-slate-200`}>

          <Header />

          <SignedOut>
            <LandingPage />

          </SignedOut>

          <SignedIn>
            {/* 3. Sab se bada masla: 'overflow-hidden' ko hata kar 'overflow-y-auto' kiya.
               4. 'flex-1' ensures ye bacha hua space le, aur scroll enable rahe.
            */}
            <main className="flex-1 w-full mt-16 overflow-y-auto">
              {children}
            </main>
          </SignedIn>

        </body>
      </html>
    </ClerkProvider >
  )
}