"use client";
import React, { useState } from 'react';
import CreateDesignModal from './CreateDesignModal';

// Refined Icons - Cleaner paths, consistent weight
const Icons = {
    Presentation: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V15C22 16.6569 20.6569 18 19 18H13V20H15V22H9V20H11V18H5C3.34315 18 2 16.6569 2 15V7ZM5 6C4.44772 6 4 6.44772 4 7V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V7C20 6.44772 19.5523 6 19 6H5Z" /><path d="M7 8H17V13H7V8Z" /></svg>,
    SocialMedia: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" /><path d="M18 6.5C18 7.32843 17.3284 8 16.5 8C15.6716 8 15 7.32843 15 6.5C15 5.67157 15.6716 5 16.5 5C17.3284 5 18 5.67157 18 6.5Z" /></svg>,
    Video: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6ZM6 5.5C5.72386 5.5 5.5 5.72386 5.5 6V18C5.5 18.2761 5.72386 18.5 6 18.5H18C18.2761 18.5 18.5 18.2761 18.5 18V6C18.5 5.72386 18.2761 5.5 18 5.5H6ZM10 8.5L15 12L10 15.5V8.5Z" /></svg>,
    Printables: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8C2 6.89543 2.89543 6 4 6H6V4ZM8 4V6H16V4H8ZM4 8V18H20V8H4ZM6 11H18V13H6V11Z" /></svg>,
    Doc: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6ZM6 4H13V9H18V20H6V4ZM8 12V13.5H16V12H8ZM8 15V16.5H16V15H8Z" /></svg>,
    Whiteboard: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM5 5H19V19H5V5ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" /></svg>,
    Sheet: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12H16V13.5H8V12ZM8 15H16V16.5H8V15ZM8 18H13V19.5H8V18Z" /></svg>,
    Website: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4ZM4 6H20V18H4V6ZM6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8Z" /></svg>,
    Upload: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    More: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><circle cx="12" cy="12" r="2" /><circle cx="5" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>,
    Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
};

const CATEGORIES = [
    { name: 'Presentation', tab: 'Presentations', Icon: Icons.Presentation, color: 'bg-orange-500', shadow: 'shadow-orange-200' },
    { name: 'Social media', tab: 'Social media', Icon: Icons.SocialMedia, color: 'bg-pink-500', shadow: 'shadow-pink-200' },
    { name: 'Video', tab: 'Videos', Icon: Icons.Video, color: 'bg-purple-600', shadow: 'shadow-purple-200' },
    { name: 'Printables', tab: 'Printables', Icon: Icons.Printables, color: 'bg-teal-500', shadow: 'shadow-teal-200' },
    { name: 'Doc', tab: 'Docs', Icon: Icons.Doc, color: 'bg-blue-500', shadow: 'shadow-blue-200' },
    { name: 'Whiteboard', tab: 'Whiteboards', Icon: Icons.Whiteboard, color: 'bg-green-500', shadow: 'shadow-green-200' },
    { name: 'Sheet', tab: 'Sheets', Icon: Icons.Sheet, color: 'bg-emerald-600', shadow: 'shadow-emerald-200' },
    { name: 'Website', tab: 'Websites', Icon: Icons.Website, color: 'bg-indigo-500', shadow: 'shadow-indigo-200' },
    { name: 'Upload', tab: 'Upload', Icon: Icons.Upload, color: 'bg-gray-100', isOutline: true },
    { name: 'More', tab: 'For you', Icon: Icons.More, color: 'bg-gray-100', isOutline: true }
];

const NEW_ASSETS = [
    { id: 'sharktank', name: 'Shark Tank India', sub: 'Build your brand with templates as seen on', image: 'https://content-management-files.canva.com/7d18ed99-2aa4-42c7-8213-6be0531eb47b/SharkTank.png', color: 'bg-[#FF5A1F]', isDark: true },
    { id: 'valentines', name: 'Valentine vibe', sub: 'Create your kind of', image: 'https://content-management-files.canva.com/bdbb644b-68e0-40ba-8fb3-e7efe7293a7e/ValentinesDay.png', color: 'bg-[#FF5E5E]', isDark: true },
    { id: 'mahashivratri', name: 'Mahashivratri', sub: 'Celebrate with divine designs', image: 'https://content-management-files.canva.com/d1dad7af-e45e-47a0-bf83-71df1763af23/MahaShivratri.png', color: 'bg-[#3B82F6]', isDark: true },
    { id: 'ramadan', name: 'Ramadan vibes', sub: 'Illuminate your designs with', image: 'https://content-management-files.canva.com/3ac5a381-00f9-4679-8f78-1313166f35f1/Ramadan.png', color: 'bg-[#FBBF24]', isDark: false },
    { id: 'holi', name: 'Holi colours', sub: 'Let your designs burst with', image: 'https://content-management-files.canva.com/6018a251-5a2d-4ae0-a9f2-6d78f579af3d/Holi.png', color: 'bg-[#A855F7]', isDark: true },
];

const SidebarItem = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex flex-col items-center gap-1.5 p-3 cursor-pointer group w-full transition-all duration-200 relative ${active ? 'bg-purple-50' : 'hover:bg-gray-100'}`}
    >
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#754DE8] rounded-r-lg"></div>}
        <div className={`w-5 h-5 transition-colors ${active ? 'text-[#754DE8]' : 'text-gray-500 group-hover:text-gray-900'}`}>
            {icon}
        </div>
        <span className={`text-[11px] font-medium text-center tracking-tight leading-3 ${active ? 'text-[#754DE8]' : 'text-gray-500 group-hover:text-gray-900'}`}>{label}</span>
    </div>
);

export default function HomeDashboard({ onOpenEditor }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('For you');

    const handleOpenCreateModal = (category) => {
        // If passed via onClick event, category will be an object. We default to 'For you' in that case.
        const targetCategory = (typeof category === 'string') ? category : 'For you';
        setSelectedCategory(targetCategory);
        setIsCreateModalOpen(true);
    };
    const handleCloseCreateModal = () => setIsCreateModalOpen(false);

    return (
        <div className="flex h-screen bg-white font-sans overflow-hidden antialiased text-gray-900 selection:bg-purple-100 selection:text-purple-700">
            <CreateDesignModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                initialCategory={selectedCategory}
                onOpenEditor={onOpenEditor}
            />

            {/* Left Sidebar - Navigation */}
            <div className="w-[88px] bg-white border-r border-gray-100 flex flex-col items-center py-6 flex-shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="mb-6">
                    {/* Hamburger Menu */}
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </div>

                <div className="flex flex-col w-full gap-1">
                    {/* Create Button */}
                    <div
                        onClick={handleOpenCreateModal}
                        className="flex flex-col items-center gap-2 mb-6 group cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B3DFF] to-[#754DE8] flex items-center justify-center text-white shadow-lg shadow-purple-200 group-hover:shadow-purple-300 group-hover:scale-105 transition-all duration-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <span className="text-[11px] font-bold text-gray-700 group-hover:text-[#754DE8] transition-colors">Create</span>
                    </div>

                    <SidebarItem active={true} label="Home" icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>} />
                    <SidebarItem label="Projects" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>} />
                    <SidebarItem onClick={handleOpenCreateModal} label="Templates" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>} />
                    <SidebarItem label="Brand" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>} />
                    <SidebarItem label="Apps" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-white">

                {/* Subtle Top Gradient */}
                <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-tl from-[#F4F1FD] via-[#FFFFFF] to-[#E9F8F9] opacity-80 pointer-events-none z-0"></div>

                {/* Top Bar */}
                <div className="flex items-center justify-end px-8 py-5 z-20">
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm text-gray-500 border border-gray-100 transition-all">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm text-gray-500 border border-gray-100 transition-all">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-white">
                            ZA
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-10 pb-12 z-10 relative">

                    {/* Hero Header */}
                    <div className="text-center mb-12 mt-4 space-y-8">
                        <h1 className="text-5xl font-extrabold text-[#0E1318] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 pb-2">What will you design today?</h1>

                        {/* Search Bar - Premium Look */}
                        <div className="max-w-[720px] mx-auto relative group z-20">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                            <div className="bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300 border border-gray-100 flex items-center p-2 pl-6 h-[64px] relative">
                                <Icons.Search />
                                <input
                                    type="text"
                                    placeholder="Search designs, folders and uploads"
                                    className="flex-1 outline-none text-gray-700 placeholder-gray-400 h-full text-[16px] ml-4 bg-transparent"
                                />
                                <div className="h-8 w-px bg-gray-200 mx-2"></div>
                                <button className="p-3 hover:bg-gray-50 rounded-full text-gray-500 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Categories Icons - International Level */}
                    <div className="flex justify-center flex-wrap gap-8 mb-16 max-w-6xl mx-auto">
                        {CATEGORIES.map(cat => (
                            <div
                                key={cat.name}
                                onClick={() => handleOpenCreateModal(cat.tab)}
                                className="flex flex-col items-center gap-3 cursor-pointer group"
                            >
                                <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1.5 
                                    ${cat.isOutline
                                        ? 'border border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600 shadow-sm'
                                        : `${cat.color} text-white shadow-lg ${cat.shadow} group-hover:shadow-xl group-hover:brightness-110`
                                    }`}
                                >
                                    <cat.Icon />
                                </div>
                                <span className="text-[12px] font-semibold text-gray-500 group-hover:text-gray-900 transition-colors text-center whitespace-nowrap">{cat.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* "See what's new" Section - Refined Cards */}
                    <div className="max-w-[1400px] mx-auto px-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#0E1318] tracking-tight">See what's new</h2>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg></button>
                                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {NEW_ASSETS.map(asset => (
                                <div
                                    key={asset.id}
                                    onClick={() => onOpenEditor({ name: asset.name, type: 'Design', width: 1920, height: 1080 })} // Default to presentation for these assets for now, or match specific types
                                    className={`rounded-2xl relative overflow-hidden cursor-pointer group h-[220px] shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all duration-500 transform hover:-translate-y-1 ${asset.color}`}
                                >
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 z-20 pointer-events-none">
                                        <div>
                                            {asset.sub && <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 opacity-80 ${asset.isDark ? 'text-white' : 'text-gray-900'}`}>{asset.sub}</p>}
                                            <h3 className={`text-2xl font-extrabold leading-tight ${asset.isDark ? 'text-white' : 'text-gray-900'}`}>{asset.name} ›</h3>
                                        </div>
                                        {asset.name.includes('Shark') && <div className="text-[10px] bg-yellow-400 text-black px-2.5 py-1 rounded-full font-bold self-start mt-2 shadow-sm tracking-wide">NEW</div>}
                                    </div>

                                    {/* Fully Visible Images (No Hover Needed) */}
                                    <div className="absolute right-0 bottom-0 top-0 w-full transition-all duration-500 ease-in-out">
                                        <img src={asset.image} alt={asset.name} className="w-full h-full object-contain object-bottom transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                                    </div>
                                    {/* Reduced opacity gradient by default so image is visible */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${asset.color} via-transparent to-transparent opacity-40 transition-opacity duration-500 z-10`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recents Section - Clean Layout */}
                    <div className="max-w-[1400px] mx-auto px-2 mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-[#0E1318]">Recents</h2>
                        </div>

                        <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-gray-300">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16l6-6 3 3 6-6" /><path d="M4 22h16" /></svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No designs yet</h3>
                            <p className="text-gray-500 mt-1">Create your first design to see it here.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
