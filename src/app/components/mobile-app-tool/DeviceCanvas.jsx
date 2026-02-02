"use client";
import React from "react";
import { Trash2, Smartphone, Plus } from "lucide-react";

// Refined Rendered Components with "Premium" styling
const RenderedComponent = ({ type, data, isSelected, onClick, onDelete, isPreview }) => {
    const getComponent = () => {
        switch (type) {
            case "header":
                return (
                    <div className="bg-white/90 backdrop-blur-md p-4 shadow-sm flex justify-between items-center border-b border-gray-100/50 sticky top-0 z-20">
                        <h1 className="font-bold text-lg text-slate-800 tracking-tight">{data.title || "App Name"}</h1>
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                        </div>
                    </div>
                );
            case "hero":
                return (
                    <div className="relative h-64 w-full overflow-hidden group/hero">
                        <img
                            src={data.image || "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                            alt="Hero"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/hero:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                            <h2 className="text-white font-bold text-2xl drop-shadow-md">{data.text || "Welcome"}</h2>
                        </div>
                    </div>
                );
            case "text":
                return (
                    <div className="px-6 py-4 bg-white">
                        <p className="text-slate-600 text-[15px] leading-relaxed font-normal">{data.content || "Lorem ipsum dolor sit amet."}</p>
                    </div>
                );
            case "button":
                return (
                    <div className="px-6 py-4 bg-white">
                        <button
                            className="w-full py-3.5 px-4 rounded-2xl font-semibold shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                            style={{ backgroundColor: data.color || "#3b82f6", color: data.textColor || "#ffffff" }}
                        >
                            {data.label || "Click Me"}
                        </button>
                    </div>
                );
            case "card":
                return (
                    <div className="px-6 py-3 bg-white">
                        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden group/card hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                            <div className="h-40 bg-slate-100 relative overflow-hidden">
                                <img
                                    src={data.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                    alt="Product"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                />
                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover/card:opacity-100 transition-all translate-y-2 group-hover/card:translate-y-0">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-slate-800 text-lg">{data.title || "Product Item"}</h3>
                                    <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs">{data.subtitle || "$99.00"}</span>
                                </div>
                                <p className="text-slate-400 text-sm line-clamp-2">Premium quality item with extended warranty.</p>
                            </div>
                        </div>
                    </div>
                );
            case "list":
                return (
                    <div className="bg-white px-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 mx-2 rounded-2xl hover:bg-slate-50 transition-colors group/item cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 text-lg">{i}</div>
                                <div className="flex-1">
                                    <div className="w-32 h-4 rounded-lg bg-slate-200 mb-2 group-hover/item:bg-slate-300 transition-colors"></div>
                                    <div className="w-20 h-3 rounded-lg bg-slate-100 group-hover/item:bg-slate-200 transition-colors"></div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "navbar":
                return (
                    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200/50 h-[84px] pb-5 flex justify-around items-center px-4 z-30">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${i === 1 ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                                <div className={`w-6 h-6 rounded-lg ${i === 1 ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : 'bg-current opacity-20'}`}></div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <div className="p-4 bg-red-50 text-red-500">Unknown Component</div>;
        }
    };

    return (
        <div
            onClick={(e) => {
                if (!isPreview) {
                    e.stopPropagation();
                    onClick();
                }
            }}
            className={`relative group transition-all duration-200 ${isSelected && !isPreview ? 'ring-2 ring-blue-500 ring-offset-0 z-10' : ''} ${!isPreview ? 'hover:bg-blue-50/5' : ''}`}
        >
            {isSelected && !isPreview && (
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg z-50 hover:bg-red-600 transition-transform hover:scale-110 active:scale-90"
                >
                    <Trash2 size={16} />
                </button>
            )}
            {getComponent()}
        </div>
    );
};

export default function DeviceCanvas({ previewMode, appComponents, selectedComponent, setSelectedComponent, onAddComponent, onDeleteComponent, isPreview }) {

    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("componentType");
        if (type) {
            onAddComponent(type);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const isTablet = previewMode === "tablet";

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-10 w-full transition-all duration-500">
            <div
                className={`relative transition-all duration-500 ease-in-out bg-black rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-slate-900 overflow-hidden ${isTablet ? 'w-[768px] h-[1024px] rounded-[30px]' : 'w-[430px] h-[932px]'}`}
            >
                {/* Dynamic Island / Notch */}
                {!isTablet && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 h-[35px] w-[120px] bg-black rounded-full z-50 flex items-center justify-center shadow-sm pointer-events-none">
                        {/* Camera lens simulation */}
                        <div className="absolute right-3 w-3 h-3 bg-[#1a1a1a] rounded-full"></div>
                    </div>
                )}

                {/* Screen Content */}
                <div
                    className="w-full h-full bg-slate-50 overflow-y-auto scrollbar-hide relative selection:bg-blue-500/20"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => !isPreview && setSelectedComponent(null)}
                >
                    {appComponents.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 p-8 m-4">
                            <Smartphone size={64} className="mb-6 opacity-20" strokeWidth={1} />
                            <p className="font-semibold text-lg text-slate-400">Your App Canvas</p>
                            <p className="text-sm text-center mt-2 opacity-60 max-w-[200px]">Drag components from the sidebar to start building</p>
                        </div>
                    ) : (
                        <div className={`pb-24 min-h-full flex flex-col ${['header', 'hero'].includes(appComponents[0]?.type) ? '' : 'pt-14'}`}>
                            {/* Fake Status Bar */}
                            <div className="flex justify-between items-center px-6 h-12 text-[15px] font-semibold text-slate-900 absolute top-0 left-0 right-0 z-10 pointer-events-none mix-blend-difference text-white">
                                <span>9:41</span>
                                <div className="flex gap-2 items-center">
                                    <div className="w-4 h-4 rounded-full border border-current opacity-50"></div>
                                </div>
                            </div>

                            {appComponents.map((comp) => (
                                <RenderedComponent
                                    key={comp.id}
                                    type={comp.type}
                                    data={comp.data}
                                    isSelected={selectedComponent?.id === comp.id}
                                    onClick={() => setSelectedComponent(comp)}
                                    onDelete={() => onDeleteComponent(comp.id)}
                                    isPreview={isPreview}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-1.5 bg-black/90 rounded-full z-50 backdrop-blur-md shadow-sm pointer-events-none"></div>
            </div>

            {!isPreview && (
                <div className="mt-8 text-sm text-slate-400 font-medium tracking-wide uppercase flex flex-col items-center gap-2">
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">{isTablet ? 'iPad Pro 12.9"' : 'iPhone 15 Pro Max'}</span>
                </div>
            )}
        </div>
    );
}
