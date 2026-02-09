"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import axios from "axios"

interface Message {
    id: number
    text: string
    sender: "user" | "ai"
    timestamp: string
}
import { useAuth } from "@clerk/nextjs";
const Chat: React.FC<{ fileName: string }> = ({ fileName }) => {
    const { getToken } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your AI assistant. Upload a PDF and I'll help you analyze the details.",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
    ])

    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isLoading])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userText = input
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        const userMessage: Message = {
            id: Date.now(),
            text: userText,
            sender: "user",
            timestamp: time,
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)
        const token = await getToken();
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/chat`, {
                params: { query: userText, fileName },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const aiMessage: Message = {
                id: Date.now() + 1,
                text: response.data.answer || "I couldn't find an answer in the document.",
                sender: "ai",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: "Server connection failed. Try again.",
                sender: "ai",
                timestamp: time,
            }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full w-full bg-transparent overflow-hidden">
            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"
            >
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${msg.sender === "user"
                                ? "bg-blue-600 border-blue-500"
                                : "bg-slate-900 border-slate-700"
                                }`}
                        >
                            {msg.sender === "user" ? (
                                <User className="w-4 h-4 text-white" />
                            ) : (
                                <Bot className="w-4 h-4 text-blue-400" />
                            )}
                        </div>

                        <div className={`flex flex-col max-w-[80%]`}>
                            <div
                                className={`p-4 rounded-2xl text-sm ${msg.sender === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-slate-900/60 text-slate-200 border border-slate-800 rounded-tl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-slate-600 mt-1 px-1 uppercase">
                                {msg.timestamp}
                            </span>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></span>
                            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            {!fileName ? (
                <div className="p-6">
                    <div className="bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 p-4 rounded-xl flex items-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        <p className="text-sm font-medium">
                            Upload a PDF to start asking questions!
                        </p>
                    </div>
                </div>
            ) : (
                <footer className="p-4 md:p-6 border-t border-slate-800">
                    <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={isLoading}
                            placeholder="Ask about your document..."
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-40"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </footer>
            )}
        </div>
    )
}

export default Chat
