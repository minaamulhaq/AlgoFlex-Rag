import React from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  FileText,
  Zap,
  ShieldCheck,
  Users,
  Target,
  Layers,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import Footer from '@/component/Footer';

/**
 * AboutPage Component
 * * A clean, dark-themed professional About page for Algoflex Chat.
 * Built for Next.js with Tailwind CSS and Lucide Icons.
 */
export default function AboutPage() {
  return (
    <div>


      <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:py-10 space-y-32">

          {/* Founder Section */}
          <section className="flex flex-col md:flex-row items-center gap-10 border-b border-slate-900 pb-24">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-40 h-40 overflow-hidden rounded-2xl border border-slate-800">
                <Image
                  src="/founder.webp"
                  alt="Founder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Muhammad Inaam ul haq</h3>
                <p className="text-blue-500 font-medium">Founder & Lead Engineer</p>
              </div>
              <p className="text-slate-400 max-w-xl leading-relaxed text-lg">
                "We didn't set out to build another chatbot. We set out to build a cognitive
                multiplier. Algoflex Chat is the result of years spent trying to make AI
                actually understand the messy, unstructured reality of modern work data."
              </p>
            </div>
          </section>

          {/* Mission / Story */}
          <section className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white tracking-tight">The Mission</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                At Algoflex, we believe that information is only as valuable as your ability to
                access and synthesize it. In a world drowning in documents, emails, and data points,
                clarity is the ultimate competitive advantage.
              </p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-xl font-semibold text-white mb-4">Our Commitment</h3>
              <p className="text-slate-400 leading-relaxed">
                We are committed to building AI that respects the "Human-in-the-Loop" philosophy.
                Our tools are designed to augment your expertise, not replace it, by handling
                the heavy lifting of data retrieval and pattern recognition.
              </p>
            </div>
          </section>

          {/* Problem & Value Proposition */}
          <section className="space-y-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-white mb-6">Solving the Context Collapse</h2>
              <p className="text-slate-400 text-lg">
                Traditional AI tools lose track of context the moment you switch topics or upload
                large files. This "Context Collapse" leads to generic answers that don't apply
                to your specific project.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                <div className="shrink-0 text-red-500 font-bold">01.</div>
                <p className="text-slate-300">Eliminates the need to manually summarize long reports or technical documentation.</p>
              </div>
              <div className="flex gap-4 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <div className="shrink-0 text-blue-500 font-bold">02.</div>
                <p className="text-slate-300">Connects disparate data silos into a single, conversational interface.</p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="space-y-16">
            <h2 className="text-3xl font-bold text-white text-center">Engineered for Deep Work</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: "Context-Aware Chat",
                  desc: "Conversational AI that maintains a deep memory of your project history and goals."
                },
                {
                  icon: FileText,
                  title: "Universal Docu-Chat",
                  desc: "Upload PDFs, CSVs, or MD files. Our engine indexes them for instant, cited retrieval."
                },
                {
                  icon: Zap,
                  title: "Workflow Automation",
                  desc: "Transform chat outputs directly into tasks, summaries, or structured code blocks."
                }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-slate-900/30 border border-slate-800 hover:bg-slate-900/50 transition-all">
                  <feature.icon className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="relative overflow-hidden rounded-3xl bg-blue-600 px-8 py-16 md:px-16 text-white">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Why Algoflex Different?</h2>
                <p className="text-blue-100 text-lg">
                  Most platforms are generic wrappers. Algoflex is a specialized infrastructure
                  built for high-stakes accuracy.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Neural-rank retrieval for 40% higher accuracy in document Q&A",
                  "Sub-second latency on large file indexing",
                  "Zero-data retention options for enterprise security",
                  "Multi-model routing (GPT-4o, Claude 3.5, and Llama 3)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-125 h-125 bg-white/10 rounded-full blur-3xl"></div>
          </section>

          {/* Security & Privacy */}


          {/* Target Audience */}
          <section className="text-center space-y-12 pb-20">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white text-center">Who is Algoflex for?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Our platform is tailored for professionals who trade in high-density information.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Legal Tech", icon: ShieldCheck },
                { name: "SaaS Founders", icon: Layers },
                { name: "Data Analysts", icon: Target },
                { name: "Dev Teams", icon: Cpu }
              ].map((audience, i) => (
                <div key={i} className="group p-6 rounded-2xl border border-slate-900 bg-slate-900/20 hover:border-blue-500/30 transition-all">
                  <audience.icon className="w-6 h-6 text-slate-500 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                  <span className="text-white font-semibold">{audience.name}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

      </main>
      <Footer />
    </div>
  );
}