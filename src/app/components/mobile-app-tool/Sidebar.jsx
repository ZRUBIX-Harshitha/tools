"use client";
import React from "react";
import {
    Square,
    Type,
    Image as ImageIcon,
    List,
    Layout,
    Menu,
    Smartphone,
    CreditCard
} from "lucide-react";

const components = [
    { id: "header", label: "App Header", icon: <Layout size={20} /> },
    { id: "hero", label: "Hero Image", icon: <ImageIcon size={20} /> },
    { id: "text", label: "Text Block", icon: <Type size={20} /> },
    { id: "button", label: "Button", icon: <Square size={20} /> },
    { id: "card", label: "Product Card", icon: <CreditCard size={20} /> },
    { id: "list", label: "List View", icon: <List size={20} /> },
    { id: "navbar", label: "Tab Bar", icon: <Menu size={20} /> },
];

export default function Sidebar() {
    const handleDragStart = (e, componentType) => {
        e.dataTransfer.setData("componentType", componentType);
    };

    return (
        <div className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-10">
            <div className="p-5 border-b border-slate-100">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                    <Smartphone className="text-blue-600" size={24} />
                    App Builder
                </h1>
                <p className="text-xs text-slate-500 mt-1">Drag components to build</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
                        Components
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {components.map((comp) => (
                            <div
                                key={comp.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, comp.id)}
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-500/50 hover:bg-blue-50/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                            >
                                <div className="text-slate-500 group-hover:text-blue-600 transition-colors">
                                    {comp.icon}
                                </div>
                                <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">
                                    {comp.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <div className="text-xs text-center text-slate-400">
                    v1.0.0 • Pro Edition
                </div>
            </div>
        </div>
    );
}
