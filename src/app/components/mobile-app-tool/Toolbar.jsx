"use client";
import React from "react";
import { Undo, Redo, Play, Eye, EyeOff, Smartphone, Tablet, ChevronLeft, Moon, Sun } from "lucide-react";

export default function Toolbar({ previewMode, setPreviewMode, isPreview, setIsPreview }) {
    return (
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 shadow-sm relative">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                        A
                    </div>
                    <span className="font-bold text-slate-800 tracking-tight">AppBuilder</span>
                </div>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
                    <button
                        onClick={() => setPreviewMode("mobile")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${previewMode === "mobile" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <Smartphone size={14} />
                        Mobile
                    </button>
                    <button
                        onClick={() => setPreviewMode("tablet")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${previewMode === "tablet" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <Tablet size={14} />
                        Tablet
                    </button>
                </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                {/* Center controls if needed */}
                <div className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 text-xs font-medium text-slate-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    Changes Saved
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsPreview(!isPreview)}
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${isPreview ? 'bg-slate-900 text-white shadow-slate-900/20' : 'bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700'}`}
                >
                    {isPreview ? <EyeOff size={16} /> : <Play size={16} fill="white" />}
                    {isPreview ? "Exit Preview" : "Preview App"}
                </button>
            </div>
        </div>
    );
}
