"use client"

import React, { useRef, useState } from 'react'
import { FileText, Upload, X, CheckCircle2, Loader2 } from 'lucide-react'
import axios from 'axios';
import { useAuth } from "@clerk/nextjs";


const FileUpload: React.FC<{ setFileName: (fileName: string) => void }> = ({ setFileName }) => {
    const { getToken } = useAuth();



    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            const token = await getToken();
            if (file.type === "application/pdf") {
                setSelectedFile(file);
                setIsUploading(true);

                const formData = new FormData();
                formData.append('pdf', file);

                try {
                    const req = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URI}/upload/pdf`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    );
                    console.log("Upload Success:", req);
                    setFileName(req.data.fileName);
                } catch (error: any) {
                    console.error("Upload Failed:", error.response?.data || error.message);
                } finally {
                    setIsUploading(false);
                }
            } else {
                alert("Please upload a PDF file only.");
            }
        }
    };

    const handleFileUploadButtonClick = () => {
        inputRef.current?.click();
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleFileUploadButtonClick}
                className={`
                    relative group cursor-pointer overflow-hidden
                    flex flex-col items-center justify-center 
                    p-6 rounded-2xl border-2 border-dashed transition-all duration-500
                    ${dragActive
                        ? "border-blue-500 bg-blue-500/10 scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                        : "border-slate-800 bg-slate-900/40 hover:border-blue-500/50 hover:bg-slate-900/60"}
                    ${selectedFile ? "border-solid border-blue-500/30" : ""}
                `}
            >
                {/* Background Decorative Glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />

                {/* Icon State Logic */}
                <div className={`
                    mb-4 p-4 rounded-2xl transition-all duration-300
                    ${selectedFile ? "bg-blue-500/20 text-blue-400" : "bg-slate-800/50 text-slate-500 group-hover:text-blue-400 group-hover:bg-blue-500/10"}
                `}>
                    {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : selectedFile ? (
                        <CheckCircle2 className="w-6 h-6 animate-in zoom-in" />
                    ) : (
                        <Upload className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    )}
                </div>

                <div className="text-center px-2">
                    {selectedFile ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-sm font-semibold text-white truncate max-w-50">
                                {selectedFile.name}
                            </p>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">
                                {isUploading ? "Uploading..." : "Ready for Analysis"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm font-bold text-slate-200">Drop PDF here</p>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight">
                                or click to browse files
                            </p>
                        </>
                    )}
                </div>

                {/* Remove Button */}
                {selectedFile && !isUploading && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-red-500/20 hover:text-red-500 transition-all border border-slate-700/50"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}

                {/* Progress bar simulation for polish */}
                {isUploading && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 animate-progress-loading w-full" />
                )}
            </div>

            <p className="text-[9px] text-slate-600 text-center mt-3 uppercase tracking-widest">
                Maximum file size: 100MB
            </p>
        </div>
    )
}

export default FileUpload;