import React, { useState } from 'react';

const CanvaEditor = ({ onClose, config }) => {
    const [activeSidebarItem, setActiveSidebarItem] = useState('Design');
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState('mp4');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);
        // Simulate processing time
        setTimeout(() => {
            setIsDownloading(false);
            setIsDownloadMenuOpen(false);
            setIsShareOpen(false);

            // Trigger a simulated file download
            const link = document.createElement('a');
            link.href = 'data:text/plain;charset=utf-8,Canva Mock Download File';
            link.download = `${config?.name || 'design'}.${downloadFormat}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Optional: User feedback could go here (toast), but closing modal indicates success.
            alert(`Downloaded ${config?.name || 'design'}.${downloadFormat} successfully!`);
        }, 2000);
    };

    const [canvasObjects, setCanvasObjects] = useState([
        { id: 1, type: 'text', content: 'Double click to edit', x: 50, y: 50, width: 300, fontSize: 32, fontWeight: 'bold' }
    ]);
    const [selectedObjectId, setSelectedObjectId] = useState(null);
    const [dragState, setDragState] = useState({ isDragging: false, startX: 0, startY: 0, initialObjectX: 0, initialObjectY: 0 });

    // Handle Dragging
    const handleDragStart = (e, obj) => {
        e.stopPropagation();
        setSelectedObjectId(obj.id);
        setDragState({
            isDragging: true,
            startX: e.clientX,
            startY: e.clientY,
            initialObjectX: obj.x,
            initialObjectY: obj.y
        });
    };

    const handleDragMove = (e) => {
        if (!dragState.isDragging || !selectedObjectId) return;

        const dx = e.clientX - dragState.startX;
        const dy = e.clientY - dragState.startY;

        setCanvasObjects(prev => prev.map(obj => {
            if (obj.id === selectedObjectId) {
                return { ...obj, x: dragState.initialObjectX + dx, y: dragState.initialObjectY + dy };
            }
            return obj;
        }));
    };

    const handleDragEnd = () => {
        setDragState({ ...dragState, isDragging: false });
    };

    // Add Element Function
    const addElement = (type, payload = {}) => {
        const newId = Date.now();
        const startX = Math.random() * 200 + 50;
        const startY = Math.random() * 200 + 50;

        let newObject = {
            id: newId,
            x: startX,
            y: startY,
            width: 200,
            height: 200,
            rotation: 0,
            ...payload
        };

        if (type === 'text') {
            newObject = { ...newObject, type: 'text', content: 'Add a heading', width: 400, height: 60, fontSize: 42, fontWeight: 'bold' };
        } else if (type === 'square') {
            newObject = { ...newObject, type: 'shape', shapeType: 'square', content: '', backgroundColor: '#8B3DFF', width: 150, height: 150 };
        } else if (type === 'circle') {
            newObject = { ...newObject, type: 'shape', shapeType: 'circle', content: '', backgroundColor: '#FF5C8D', width: 150, height: 150, borderRadius: '50%' };
        } else if (type === 'image') {
            newObject = { ...newObject, type: 'image', src: payload.src || 'https://via.placeholder.com/300', width: 300, height: 200 };
        }

        setCanvasObjects([...canvasObjects, newObject]);
        setSelectedObjectId(newId);
    };

    // Render Canvas Objects Helper
    const renderCanvasObjects = () => {
        return canvasObjects.map(obj => (
            <div
                key={obj.id}
                onMouseDown={(e) => handleDragStart(e, obj)}
                onClick={(e) => { e.stopPropagation(); setSelectedObjectId(obj.id); }}
                style={{
                    position: 'absolute',
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.width}px`,
                    height: obj.height ? `${obj.height}px` : 'auto',
                    transform: `rotate(${obj.rotation}deg)`,
                    cursor: 'move',
                    border: selectedObjectId === obj.id ? '2px solid #8B3DFF' : '1px solid transparent',
                    zIndex: 10
                }}
                className="group select-none"
            >
                {/* Content */}
                {obj.type === 'text' && (
                    <div
                        style={{ fontSize: `${obj.fontSize}px`, fontWeight: obj.fontWeight, color: '#000', lineHeight: 1.2 }}
                        contentEditable
                        suppressContentEditableWarning
                        className="w-full h-full outline-none"
                    >
                        {obj.content}
                    </div>
                )}
                {obj.type === 'shape' && (
                    <div style={{ width: '100%', height: '100%', backgroundColor: obj.backgroundColor, borderRadius: obj.borderRadius || '0' }}></div>
                )}
                {obj.type === 'image' && (
                    <img src={obj.src} alt="element" className="w-full h-full object-cover pointer-events-none" />
                )}

                {/* Selection Controls (Visual Only) */}
                {selectedObjectId === obj.id && (
                    <>
                        <div className="absolute -top-3 -left-3 w-2.5 h-2.5 bg-white border border-gray-400 rounded-full"></div>
                        <div className="absolute -top-3 -right-3 w-2.5 h-2.5 bg-white border border-gray-400 rounded-full"></div>
                        <div className="absolute -bottom-3 -left-3 w-2.5 h-2.5 bg-white border border-gray-400 rounded-full"></div>
                        <div className="absolute -bottom-3 -right-3 w-2.5 h-2.5 bg-white border border-gray-400 rounded-full"></div>
                    </>
                )}
            </div>
        ));
    };

    // Default configuration if none provided
    const defaultConfig = {
        name: 'Untitled design',
        type: 'Presentation',
        width: 1920,
        height: 1080
    };

    const currentConfig = { ...defaultConfig, ...config };

    // Helper to determine canvas style dimensions based on config
    const getCanvasStyle = () => {
        // If exact pixels provided in config
        if (currentConfig.width && currentConfig.height) {

            // Available viewport space (approximate)
            const MAX_WIDTH = 900;
            const MAX_HEIGHT = 550;

            const originalWidth = currentConfig.width;
            const originalHeight = currentConfig.height;
            const aspect = originalWidth / originalHeight;

            // Algorithm: Fit within box while preserving aspect ratio
            let renderWidth, renderHeight;

            // Try fitting to height first (common for wide screens)
            if (originalWidth > originalHeight) {
                // Landscapeish
                renderWidth = Math.min(MAX_WIDTH, originalWidth);
                renderHeight = renderWidth / aspect;

                // If height still overflows
                if (renderHeight > MAX_HEIGHT) {
                    renderHeight = MAX_HEIGHT;
                    renderWidth = renderHeight * aspect;
                }
            } else {
                // Portrait or Square
                renderHeight = Math.min(MAX_HEIGHT, originalHeight);
                renderWidth = renderHeight * aspect;

                // If width overflows (rare for portrait, but possible)
                if (renderWidth > MAX_WIDTH) {
                    renderWidth = MAX_WIDTH;
                    renderHeight = renderWidth / aspect;
                }
            }

            return {
                width: `${renderWidth}px`,
                height: `${renderHeight}px`
            };
        }
        // Default Fallback
        return { width: '840px', height: '472.5px' };
    };

    const canvasDimensions = getCanvasStyle();


    return (
        <div className="flex flex-col h-screen bg-white text-[#0E1318] font-sans overflow-hidden">

            {/* 1. MAIN HEADER (Blue/Gradient-ish in some versions, but white in Light Theme) */}
            <header className="h-[56px] flex items-center justify-between px-3 border-b border-gray-200 bg-white relative z-50">

                {/* Left: Home, File, Magic Switch, Undo/Redo */}
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md text-gray-700 transition" title="Home">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z" /><path opacity=".3" d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z" /></svg>
                    </button>

                    <div className="h-6 w-px bg-gray-300 mx-1"></div>

                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded-md text-[14px] font-medium text-gray-700">File</button>
                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded-md text-[14px] font-medium text-gray-700 flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        Resize
                    </button>
                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded-md text-[14px] font-medium text-gray-700 flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                        Magic Switch
                    </button>

                    <div className="h-6 w-px bg-gray-300 mx-1"></div>

                    <button className="p-2 hover:bg-gray-100 rounded-md text-gray-700" title="Undo (Ctrl+Z)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10h10a5 5 0 0 1 5 5v2" /><path d="M3 10l6-6" /><path d="M3 10l6 6" /></svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md text-gray-700" title="Redo (Ctrl+Shift+Z)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10H11a5 5 0 0 0-5 5v2" /><path d="M21 10l-6-6" /><path d="M21 10l-6 6" /></svg>
                    </button>
                    <div className="ml-1 flex items-center text-gray-400 text-xs gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                        <span className="hidden sm:inline">All changes saved</span>
                    </div>
                </div>

                {/* Right: Title, Profile, Share */}
                <div className="flex items-center gap-3">
                    <div className="hidden lg:block max-w-[200px] truncate text-[14px] font-semibold text-gray-700 px-2 py-1 hover:border-gray-300 border border-transparent rounded cursor-text">
                        {currentConfig.name}
                    </div>

                    <div className="flex items-center -space-x-2 mr-2">
                        <div className="w-8 h-8 rounded-full bg-[#00C4CC] flex items-center justify-center text-white font-bold text-xs ring-2 ring-white cursor-pointer relative z-10">A</div>
                        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ring-2 ring-white hover:bg-gray-200 transition z-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>

                    <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-600 transition">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>

                    <button className="h-8 px-4 flex items-center gap-2 rounded bg-gray-100 hover:bg-gray-200 text-[14px] font-semibold text-gray-700 transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                        Insights
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setIsShareOpen(!isShareOpen)}
                            className="h-9 px-4 bg-[#8B3DFF] hover:bg-[#7a30e8] text-white font-bold text-[14px] rounded flex items-center gap-2 shadow-sm transition"
                        >
                            Share
                        </button>

                        {/* SHARE DROPDOWN */}
                        {isShareOpen && (
                            <div className="absolute right-0 top-12 w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-4 animate-in fade-in zoom-in duration-200 origin-top-right">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm">ZA</div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">{currentConfig.name}</h3>
                                        <p className="text-xs text-gray-500">{currentConfig.width} x {currentConfig.height} px</p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <button className="flex flex-col gap-1 p-2 hover:bg-gray-50 rounded-lg transition text-left group">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                        </div>
                                        <span className="text-[13px] font-medium text-gray-700">Copy link</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsDownloadMenuOpen(true);
                                            setIsShareOpen(false); // Switch to download view
                                        }}
                                        className="flex flex-col gap-1 p-2 hover:bg-gray-50 rounded-lg transition text-left group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        </div>
                                        <span className="text-[13px] font-medium text-gray-700">Download</span>
                                    </button>
                                </div>

                                <button className="w-full py-2 flex items-center gap-3 hover:bg-gray-50 rounded px-2 text-left group">
                                    <div className="w-8 h-8 rounded bg-pink-100 text-pink-600 flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">Instagram</span>
                                </button>
                                <button className="w-full py-2 flex items-center gap-3 hover:bg-gray-50 rounded px-2 text-left group mb-2">
                                    <div className="w-8 h-8 rounded bg-sky-100 text-sky-600 flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">Twitter (X)</span>
                                </button>

                            </div>
                        )}

                        {/* DOWNLOAD MENU (Replaces Share) */}
                        {isDownloadMenuOpen && (
                            <div className="absolute right-0 top-12 w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-4 animate-in fade-in zoom-in duration-200 origin-top-right">
                                <div className="flex items-center justify-between mb-4">
                                    <button onClick={() => { setIsDownloadMenuOpen(false); setIsShareOpen(true); }} className="hover:bg-gray-100 p-1.5 rounded-full text-gray-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                                    </button>
                                    <h3 className="text-base font-bold text-gray-900">Download</h3>
                                    <button onClick={() => setIsDownloadMenuOpen(false)} className="hover:bg-gray-100 p-1.5 rounded-full text-gray-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">File type</label>
                                        <select
                                            value={downloadFormat}
                                            onChange={(e) => setDownloadFormat(e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1rem_center]"
                                        >
                                            <option value="mp4">MP4 Video</option>
                                            <option value="png">PNG Image</option>
                                            <option value="jpg">JPG Image</option>
                                            <option value="pdf">PDF Standard</option>
                                            <option value="gif">GIF Short Clip</option>
                                        </select>
                                        <p className="text-[11px] text-gray-500">Suggested for this design type</p>
                                    </div>

                                    {(downloadFormat === 'mp4' || downloadFormat === 'gif') && (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Quality</label>
                                            <select className="w-full bg-white border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-700 outline-none">
                                                <option>1080p HD</option>
                                                <option>4k UHD</option>
                                                <option>720p HD</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 flex gap-2 items-start">
                                        <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>Save download settings for next time</span>
                                    </div>

                                    <button
                                        onClick={handleDownload}
                                        disabled={isDownloading}
                                        className="w-full bg-[#8B3DFF] hover:bg-[#7a30e8] text-white font-bold py-3 rounded-lg shadow-sm transition flex items-center justify-center gap-2 relative overflow-hidden"
                                    >
                                        {isDownloading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Downloading...
                                            </>
                                        ) : (
                                            'Download'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 2. SECONDARY TOOLBAR (When element selected, or text context) */}
            <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 justify-between relative z-40">
                {/* Left Controls */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded cursor-pointer h-8 px-2 min-w-[140px] justify-between">
                        <span className="text-[13px] text-gray-800 font-medium truncate">Canva Sans</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                    </div>

                    <div className="flex items-center bg-white border border-gray-200 rounded h-8">
                        <button className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="11" width="14" height="2" /></svg></button>
                        <div className="w-10 h-full flex items-center justify-center text-[13px] border-l border-r border-gray-200 font-medium">42</div>
                        <button className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg></button>
                    </div>

                    <div className="h-6 w-px bg-gray-300 mx-2"></div>

                    <ToolbarButton icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none" /><path d="M11 2L5.5 16h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 9L12 4.67 14.38 11H9.62z" /><path d="M0 20h24v4H0z" fill="#D0021B" /></svg>} />
                    <ToolbarButton active icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7c2.09 0 3.85-1.52 3.85-3.5 0-1.8-1.21-3.21-2.25-3.71zM9.5 6h3.25c1.1 0 2 .9 2 2s-.9 2-2 2H9.5V6zm3.25 12H9.5v-4h3.25c1.1 0 2 .9 2 2s-.9 2-2 2z" /></svg>} />
                    <ToolbarButton icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" /></svg>} />
                    <ToolbarButton icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" /></svg>} />
                    <ToolbarButton icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 21h14v-2H5v2zm0-4h14v-2H5v2zm0-4h14v-2H5v2zm0-4h14V7H5v2zm0-6v2h14V3H5z" /></svg>} />
                    <ToolbarButton icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" /></svg>} />
                    <ToolbarButton icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.9 15l-2.6-2.4 2.6-2.4 1.4 1.4-2.6 2.4z m-4.8 0l2.6-2.4-2.6-2.4-1.4 1.4 2.6 2.4z m-1.4 0l-2.6-2.4 2.6-2.4 1.4 1.4-2.6 2.4z" /></svg>} />

                    <div className="h-6 w-px bg-gray-300 mx-2"></div>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-100 rounded text-[13px] font-medium text-gray-700">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23 1.12 4.82z" /></svg>
                        Effects
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-100 rounded text-[13px] font-medium text-gray-700">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 19h19v2h-19zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.96 2.35L10 13.98l.96 4.57 8.38 2.3z" /></svg>
                        Animate
                    </button>

                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded text-[13px] font-medium text-gray-700">Position</button>
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 21v-5h-5v5h5zM9 21v-9H4v9h5zM21 9V4h-5v5h5zM9 6V4H4v2h5z" /></svg>
                    </button>
                </div>
            </div>

            {/* 3. MAIN WORKSPACE */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR NAVIGATION - Dark Gray/Black in standard Canva, can be white in light theme. Following user screenshot which was White. */}
                <aside className="w-[72px] bg-white border-r border-gray-200 flex flex-col items-center py-2 z-30 overflow-y-auto no-scrollbar pb-20">
                    <SidebarItem label="Design" active={activeSidebarItem === 'Design'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>} onClick={() => setActiveSidebarItem('Design')} />
                    <SidebarItem label="Elements" active={activeSidebarItem === 'Elements'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" /></svg>} onClick={() => setActiveSidebarItem('Elements')} />
                    <SidebarItem label="Text" active={activeSidebarItem === 'Text'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" /></svg>} onClick={() => setActiveSidebarItem('Text')} />
                    <SidebarItem label="Brand" active={activeSidebarItem === 'Brand'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5.5 9h11z" /><path d="M12 22l-5.5-9h11z" /></svg>} onClick={() => setActiveSidebarItem('Brand')} badge="New" />
                    <SidebarItem label="Uploads" active={activeSidebarItem === 'Uploads'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg>} onClick={() => setActiveSidebarItem('Uploads')} />
                    <SidebarItem label="Draw" active={activeSidebarItem === 'Draw'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.69-5.689z" /></svg>} onClick={() => setActiveSidebarItem('Draw')} />
                    <SidebarItem label="Projects" active={activeSidebarItem === 'Projects'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>} onClick={() => setActiveSidebarItem('Projects')} />
                    <SidebarItem label="Apps" active={activeSidebarItem === 'Apps'} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" /></svg>} onClick={() => setActiveSidebarItem('Apps')} />
                </aside>

                {/* SIDEBAR PANEL (Dynamic content) */}
                <div className="w-[340px] bg-white border-r border-gray-200 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                    {/* DESIGN TAB */}
                    {activeSidebarItem === 'Design' && (
                        <div className="p-4 flex flex-col h-full overflow-hidden">
                            <div className="mb-4">
                                <input type="text" placeholder="Search templates..." className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white border-2 border-transparent focus:border-[#754DE8] rounded-md py-2.5 px-4 text-[14px] outline-none transition-all placeholder-gray-500" />
                                <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
                                    {['All results', 'Professional', 'Modern', 'Simple', 'Corporate'].map((filter, i) => (
                                        <button key={i} className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap border transition ${i === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{filter}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto -mx-2 px-2 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                                    {[
                                        'https://template.canva.com/EAGjW-S3SVM/1/0/309w-NOD9Fmh76pk.jpg',
                                        'https://template.canva.com/EAGiMmWT1XY/2/0/309w-Gqv0sD0VJ1Q.jpg',
                                        'https://template.canva.com/EAGiMRcB5Ys/2/0/309w-YyBe-dHWUB8.jpg',
                                        'https://template.canva.com/EAGIuaJUSaE/1/0/309w-6G0Nwo_-5Ls.jpg'
                                    ].map((src, i) => (
                                        <div key={i} className="group cursor-pointer" onClick={() => addElement('image', { src })}>
                                            <div className="rounded-md overflow-hidden bg-gray-100 relative mb-1.5 shadow-sm group-hover:shadow-md transition">
                                                <img src={src} alt="Template" className="w-full h-auto object-cover" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ELEMENTS TAB */}
                    {activeSidebarItem === 'Elements' && (
                        <div className="p-4 flex flex-col h-full overflow-hidden">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Shapes</h3>
                            <div className="flex gap-4 mb-6">
                                <div onClick={() => addElement('square')} className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer transition flex items-center justify-center text-xs text-gray-500">Square</div>
                                <div onClick={() => addElement('circle')} className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer transition flex items-center justify-center text-xs text-gray-500">Circle</div>
                            </div>
                        </div>
                    )}

                    {/* TEXT TAB */}
                    {activeSidebarItem === 'Text' && (
                        <div className="p-4 flex flex-col h-full overflow-hidden">
                            <button onClick={() => addElement('text')} className="w-full py-3 bg-[#8B3DFF] text-white font-bold rounded-lg hover:bg-[#7a30e8] transition shadow-md mb-6">
                                Add a text box
                            </button>
                            <div className="space-y-3">
                                <div onClick={() => addElement('text')} className="font-extrabold text-3xl text-gray-800 hover:text-[#8B3DFF] cursor-pointer transition">Add a heading</div>
                                <div onClick={() => addElement('text')} className="font-semibold text-xl text-gray-700 hover:text-[#8B3DFF] cursor-pointer transition">Add a subheading</div>
                                <div onClick={() => addElement('text')} className="text-sm text-gray-600 hover:text-[#8B3DFF] cursor-pointer transition">Add a little bit of body text</div>
                            </div>
                        </div>
                    )}

                    {/* Other Tabs Placeholder */}
                    {['Design', 'Elements', 'Text'].indexOf(activeSidebarItem) === -1 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                            <p className="text-sm">Content for {activeSidebarItem}</p>
                        </div>
                    )}
                </div>

                {/* CANVAS WORKSPACE */}
                <div className="flex-1 bg-[#F2F3F5] relative flex flex-col overflow-hidden">

                    {/* Scrollable Canvas Area */}
                    <div className="flex-1 flex flex-col items-center overflow-hidden relative w-full"> {/* Changed to flex column to stack canvas and timeline */}

                        {/* Canvas Scrollable Container */}
                        <div className="flex-1 w-full overflow-auto flex flex-col items-center p-8 custom-scrollbar">
                            {/* Page Overlay Buttons (Add Page, Comment, Lock) */}
                            <div className="w-[840px] flex justify-between mb-2">
                                <div className="text-[13px] font-semibold text-gray-500">Page 1 - Add title</div>
                                <div className="flex gap-1">
                                    <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg></button>
                                    <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></button>
                                </div>
                            </div>

                            {/* The Canvas */}
                            <div
                                className="bg-white shadow-sm relative group transition-all duration-300 ease-in-out flex-shrink-0"
                                onClick={() => setSelectedObjectId(null)}
                                onMouseMove={handleDragMove}
                                onMouseUp={handleDragEnd}
                                onMouseLeave={handleDragEnd}
                                style={{
                                    width: canvasDimensions.width,
                                    height: canvasDimensions.height
                                }}
                            >
                                {renderCanvasObjects()}
                            </div>

                            {/* Add Page Button (Only show if NOT video mode, as video has timeline) */}
                            {!(currentConfig.type === 'Videos' || currentConfig.type === 'Video' || currentConfig.name.includes('Video') || currentConfig.name.includes('Reel')) && (
                                <div className="w-[840px] flex justify-center mt-6">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:shadow-md transition">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                                        Add Page
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* VIDEO TIMELINE (Conditional) */}
                        {(currentConfig.type === 'Videos' || currentConfig.type === 'Video' || currentConfig.name.includes('Video') || currentConfig.name.includes('Reel')) && (
                            <div className="h-[160px] w-full bg-white border-t border-gray-200 flex flex-col z-30">
                                {/* Timeline Controls / Header */}
                                <div className="h-8 border-b border-gray-100 flex items-center justify-between px-2 bg-white">
                                    <div className="flex items-center gap-4">
                                        {/* Play Controls */}
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs font-medium text-gray-600 w-8 text-right">0:00</span>
                                            <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                            </button>
                                            <span className="text-xs font-medium text-gray-400 w-8">0:05</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1 hover:bg-gray-100 rounded"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg></button>
                                        <button className="p-1 hover:bg-gray-100 rounded"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg></button>
                                    </div>
                                </div>

                                {/* Timeline Tracks Area */}
                                <div className="flex-1 relative overflow-hidden bg-gray-50/50">
                                    {/* Time Ticks */}
                                    <div className="h-6 border-b border-gray-100 flex items-center text-[10px] text-gray-400 font-medium select-none relative">
                                        {[0, 10, 20, 30, 40, 50, 60, 70].map(s => (
                                            <div key={s} className="absolute top-0 bottom-0 border-l border-gray-200 pl-1 pt-1" style={{ left: `${s * 15}px` }}> {/* scaling factor for demo */}
                                                {s === 0 ? '0s' : s % 10 === 0 ? `${s}s` : ''}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Playhead */}
                                    <div className="absolute top-0 bottom-0 left-[2px] w-[1px] bg-black z-10 flex flex-col items-center">
                                        <div className="w-2.5 h-2.5 bg-black rotate-45 transform -translate-y-1.5 rounded-[1px]"></div>
                                    </div>

                                    {/* Main Track Row */}
                                    <div className="p-2">
                                        <div className="h-[72px] bg-gray-100/80 rounded-lg border border-gray-200/60 flex items-center justify-center gap-2 group cursor-pointer hover:bg-gray-100 transition-colors">
                                            <button className="w-8 h-8 rounded bg-gray-200 text-gray-500 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                            <span className="text-xs font-medium text-gray-500">or drag and drop media</span>
                                        </div>
                                    </div>

                                    {/* Audio Track Toggle */}
                                    <div className="absolute bottom-1 left-2">
                                        <button className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-200 rounded text-[11px] font-bold text-gray-600 transition">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                                            Add Audio
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                    {/* End of Flex-1 Column */}

                    {/* BOTTOM BAR - ZOOM & VIEW CONTROLS */}
                    <div className="h-[48px] bg-white border-t border-gray-200 flex items-center justify-between px-4 z-40">

                        {/* Left: Notes, Duration */}
                        <div className="flex items-center gap-4">
                            <button className="text-[12px] font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1.5">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                Notes
                            </button>
                            <button className="text-[12px] font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1.5">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                5.0s
                            </button>
                        </div>

                        {/* Right: Zoom Slider, Grid View, Full Screen */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 w-[200px]">
                                <div className="flex-1 h-1 bg-gray-200 rounded-full relative cursor-pointer group">
                                    <div className="absolute left-0 top-0 bottom-0 w-[42%] bg-gray-800 rounded-full"></div>
                                    <div className="absolute left-[42%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-gray-800 rounded-full shadow hover:scale-125 transition"></div>
                                </div>
                                <span className="text-[12px] font-medium text-gray-700 min-w-[32px]">42%</span>
                            </div>

                            <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Grid View">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Full Screen">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
    <button onClick={onClick} className={`w-full flex flex-col items-center gap-1 py-3 transition relative group ${active ? 'text-[#754DE8] bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
        {/* Active Line Indicator */}
        {active && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#754DE8] rounded-r"></div>}

        <div className="w-6 h-6">{icon}</div>
        <span className={`text-[11px] font-medium leading-none ${active ? 'font-bold' : ''}`}>{label}</span>

        {badge && (
            <span className="absolute top-1 right-2 bg-blue-100 text-blue-700 text-[9px] font-bold px-1 rounded-sm">
                {badge}
            </span>
        )}
    </button>
);

const ToolbarButton = ({ icon, active }) => (
    <button className={`p-1.5 rounded transition ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}>
        {icon}
    </button>
);

export default CanvaEditor;
