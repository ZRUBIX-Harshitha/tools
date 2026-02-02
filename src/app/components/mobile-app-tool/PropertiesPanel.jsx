"use client";
import React from "react";
import { Settings, Sliders, Type, Palette, Layout, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

export default function PropertiesPanel({ selectedComponent, onUpdateComponent }) {
    if (!selectedComponent) {
        return (
            <div className="w-[320px] bg-white border-l border-slate-200 h-full p-8 flex flex-col items-center justify-center text-center text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                    <Settings className="opacity-20 text-slate-600" size={40} />
                </div>
                <p className="font-semibold text-slate-600 text-lg">Properties</p>
                <p className="text-sm mt-2 leading-relaxed opacity-70">Select an element on the canvas to edit its properties.</p>
            </div>
        );
    }

    const handleChange = (key, value) => {
        onUpdateComponent(selectedComponent.id, { [key]: value });
    };

    return (
        <div className="w-[320px] bg-white border-l border-slate-200 h-full flex flex-col shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)] z-20">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-white/50 backdrop-blur-sm sticky top-0">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Sliders size={18} />
                </div>
                <div>
                    <h2 className="font-bold text-slate-800 text-[15px]">Properties</h2>
                    <p className="text-xs text-slate-400 capitalize">{selectedComponent.type} Component</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">

                {/* Content Section */}
                <div className="space-y-4">
                    <SectionLabel icon={<Type size={14} />} label="Content" />

                    {(selectedComponent.type === 'header' || selectedComponent.type === 'card') && (
                        <InputGroup label="Title" value={selectedComponent.data.title} onChange={(v) => handleChange('title', v)} />
                    )}

                    {(selectedComponent.type === 'hero' || selectedComponent.type === 'text') && (
                        <TextAreaGroup label="Text Content" value={selectedComponent.data.text || selectedComponent.data.content} onChange={(v) => handleChange(selectedComponent.type === 'hero' ? 'text' : 'content', v)} />
                    )}

                    {selectedComponent.type === 'button' && (
                        <InputGroup label="Label" value={selectedComponent.data.label} onChange={(v) => handleChange('label', v)} />
                    )}

                    {(selectedComponent.type === 'card') && (
                        <InputGroup label="Subtitle / Price" value={selectedComponent.data.subtitle} onChange={(v) => handleChange('subtitle', v)} />
                    )}
                </div>

                {/* Media Section */}
                {(selectedComponent.type === 'hero' || selectedComponent.type === 'card') && (
                    <div className="space-y-4">
                        <div className="h-px bg-slate-100"></div>
                        <SectionLabel icon={<ImageIcon size={14} />} label="Media" />
                        <InputGroup label="Image URL" value={selectedComponent.data.image} onChange={(v) => handleChange('image', v)} placeholder="https://..." icon={<LinkIcon size={14} />} />

                        {selectedComponent.data.image && (
                            <div className="mt-2 rounded-xl overflow-hidden border border-slate-100 h-24 relative group">
                                <img src={selectedComponent.data.image} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">Preview</div>
                            </div>
                        )}
                    </div>
                )}

                <div className="h-px bg-slate-100"></div>

                {/* Style Section */}
                <div className="space-y-4">
                    <SectionLabel icon={<Palette size={14} />} label="Appearance" />

                    <div className="grid grid-cols-1 gap-4">
                        {(selectedComponent.type === 'button') && (
                            <ColorPicker label="Background Color" value={selectedComponent.data.color || '#3b82f6'} onChange={(v) => handleChange('color', v)} />
                        )}
                        {(selectedComponent.type === 'button') && (
                            <ColorPicker label="Text Color" value={selectedComponent.data.textColor || '#ffffff'} onChange={(v) => handleChange('textColor', v)} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

const SectionLabel = ({ icon, label }) => (
    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        {icon}
        <span>{label}</span>
    </div>
);

const InputGroup = ({ label, value, onChange, placeholder, icon }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <div className="relative">
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full p-2.5 ${icon ? 'pl-9' : ''} bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400`}
                placeholder={placeholder}
            />
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        </div>
    </div>
);

const TextAreaGroup = ({ label, value, onChange }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <textarea
            rows={3}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-slate-400"
        />
    </div>
);

const ColorPicker = ({ label, value, onChange }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 bg-transparent text-sm font-mono text-slate-600 focus:outline-none uppercase"
            />
        </div>
    </div>
);
