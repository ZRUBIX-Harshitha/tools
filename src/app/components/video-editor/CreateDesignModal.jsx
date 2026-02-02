import React, { useState, useMemo, useEffect } from 'react';

// --- ICONS (Matched from HomeDashboard) ---
const Icons = {
    Presentation: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M2.5 5.5C2.5 3.84315 3.84315 2.5 5.5 2.5H18.5C20.1569 2.5 21.5 3.84315 21.5 5.5V18.5C21.5 20.1569 20.1569 21.5 18.5 21.5H5.5C3.84315 21.5 2.5 20.1569 2.5 18.5V5.5ZM5.5 4C4.67157 4 4 4.67157 4 5.5V18.5C4 19.3284 4.67157 20 5.5 20H18.5C19.3284 20 20 19.3284 20 18.5V5.5C20 4.67157 19.3284 4 18.5 4H5.5ZM8.5 14.5C8.5 13.9477 8.94772 13.5 9.5 13.5H14.5C15.0523 13.5 15.5 13.9477 15.5 14.5C15.5 15.0523 15.0523 15.5 14.5 15.5H9.5C8.94772 15.5 8.5 15.0523 8.5 14.5Z" /></svg>,
    SocialMedia: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM15.5 16.5L14 9L8.5 8.5L10 16L15.5 16.5Z" /></svg>,
    Video: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6ZM6 5.5C5.72386 5.5 5.5 5.72386 5.5 6V18C5.5 18.2761 5.72386 18.5 6 18.5H18C18.2761 18.5 18.5 18.2761 18.5 18V6C18.5 5.72386 18.2761 5.5 18 5.5H6ZM10 8.5L15 12L10 15.5V8.5Z" /></svg>,
    Printables: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8C2 6.89543 2.89543 6 4 6H6V4ZM8 4V6H16V4H8ZM4 8V18H20V8H4ZM6 11H18V13H6V11Z" /></svg>,
    Doc: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6ZM6 4H13V9H18V20H6V4ZM8 12V13.5H16V12H8ZM8 15V16.5H16V15H8Z" /></svg>,
    Whiteboard: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM5 5H19V19H5V5ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" /></svg>,
    Sheet: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12H16V13.5H8V12ZM8 15H16V16.5H8V15ZM8 18H13V19.5H8V18Z" /></svg>,
    Website: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4ZM4 6H20V18H4V6ZM6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8Z" /></svg>,
    Upload: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    Magic: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>, // Magic star icon
    Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
};

// --- DATA: Quick Actions ---
const QUICK_ACTIONS = [
    { name: 'Docs', image: 'https://static.canva.com/web/images/156e0a30130a81ef065c232b50fba0ca.png' },
    { name: 'Whiteboards', image: 'http://static.canva.com/web/images/d2a44874259b1a1d99e1d6475d6942eb.png' },
    { name: 'Presentations', image: 'http://static.canva.com/web/images/af0199df6de555feb0b5043641f3a676.png' },
    { name: 'Social Media', image: 'https://static.canva.com/web/images/50c4876ee409041d01cbc85a8af4e551.png' },
    { name: 'Videos', image: 'https://static.canva.com/web/images/e155b2cd006bab1f69a726832a11cae0.png' },
];

// --- DATA: Design Templates (SVGs) ---
const ASSETS = {
    // Presentations
    Presentation16_9: 'https://category-public.canva.com/icons/thumbnail_presentation_16_9.svg',

    // Social Media
    InstagramPost: 'https://category-public.canva.com/icons/thumbnail_instagram_post.svg',
    InstagramStory: 'https://category-public.canva.com/icons/thumbnail_instagram_story.svg',
    FacebookCover: 'https://category-public.canva.com/icons/thumbnail_facebook_cover_landscape.svg',
    TikTokPost: 'https://category-public.canva.com/icons/thumbnail_tiktok_post.svg',
    YouTubeShorts: 'https://category-public.canva.com/icons/thumbnail_youtube_shorts_portrait_video.svg',
    LinkedInBanner: 'https://category-public.canva.com/icons/thumbnail_linkedin_banner_landscape.svg',

    // Video
    VideoLandscape: 'https://category-public.canva.com/icons/thumbnail_video_mobile_landscape.svg',
    VideoPortrait: 'https://category-public.canva.com/icons/thumbnail_video_mobile_portrait.svg',

    // Print / Marketing
    Poster: 'https://category-public.canva.com/icons/thumbnail_poster.svg',
    Flyer: 'https://category-public.canva.com/icons/thumbnail_flyer_portrait.svg',
    BusinessCard: 'https://category-public.canva.com/icons/thumbnail_business_card.svg',
    Trifold: 'https://category-public.canva.com/icons/thumbnail_trifold_brochure.svg',
    Certificate: 'https://category-public.canva.com/icons/thumbnail_certificate_landscape_fixed.svg',
    Invitation: 'https://category-public.canva.com/icons/thumbnail_invitation_portrait.svg',

    // Docs & Whiteboards
    Doc: 'https://category-public.canva.com/icons/thumbnail_doc.svg',
    Document: 'https://category-public.canva.com/icons/thumbnail_document.svg',
    Whiteboard: 'https://category-public.canva.com/icons/thumbnail_whiteboard.svg',

    // Others
    Website: 'https://category-public.canva.com/icons/thumbnail_website.svg',
    Sheet: 'https://category-public.canva.com/icons/thumbnail_sheet.svg',
    Logo: 'https://category-public.canva.com/icons/thumbnail_logo.svg',
    BlogBanner: 'https://category-public.canva.com/icons/thumbnail_blog_banner_landscape.svg'
};

// --- CONTENT MAPPING (Suggested / Category Top Picks) ---
// This defines what appears in the grid for each category
const CATEGORY_CONTENT = {
    'For you': [
        { name: 'Instagram Post', image: ASSETS.InstagramPost, dim: 'Square' },
        { name: 'Presentation (16:9)', image: ASSETS.Presentation16_9, dim: '1920 × 1080 px' },
        { name: 'Whiteboard', image: ASSETS.Whiteboard, dim: 'Infinite' },
        { name: 'Doc', image: ASSETS.Doc, dim: 'A4' },
        { name: 'Your Story', image: ASSETS.InstagramStory, dim: '1080 × 1920 px' },
        { name: 'Video', image: ASSETS.VideoLandscape, dim: '1920 × 1080 px' },
    ],
    'Presentations': [
        { name: 'Presentation (16:9)', image: ASSETS.Presentation16_9, dim: '1920 × 1080 px' },
        { name: 'Talking Presentation', image: ASSETS.Presentation16_9, dim: '1920 × 1080 px' },
        { name: 'Mobile Presentation', image: ASSETS.VideoPortrait, dim: '1080 × 1920 px' },
        { name: 'Brainstorm Presentation', image: ASSETS.Presentation16_9, dim: '1920 × 1080 px' },
        { name: 'Game Presentation', image: ASSETS.Presentation16_9, dim: '1920 × 1080 px' }
    ],
    'Social media': [
        { name: 'Instagram Post', image: ASSETS.InstagramPost, dim: '1080 × 1080 px' },
        { name: 'Instagram Story', image: ASSETS.InstagramStory, dim: '1080 × 1920 px' },
        { name: 'Facebook Cover', image: ASSETS.FacebookCover, dim: '1640 × 924 px' },
        { name: 'TikTok Video', image: ASSETS.TikTokPost, dim: '1080 × 1920 px' },
        { name: 'YouTube Shorts', image: ASSETS.YouTubeShorts, dim: '1080 × 1920 px' },
        { name: 'LinkedIn Banner', image: ASSETS.LinkedInBanner, dim: '1584 × 396 px' }
    ],
    'Videos': [
        { name: 'Video (16:9)', image: ASSETS.VideoLandscape, dim: '1920 × 1080 px' },
        { name: 'Mobile Video', image: ASSETS.VideoPortrait, dim: '1080 × 1920 px' },
        { name: 'Facebook Video', image: ASSETS.VideoLandscape, dim: '1080 × 1080 px' },
        { name: 'Instagram Reel', image: ASSETS.InstagramStory, dim: '1080 × 1920 px' },
        { name: 'TikTok Video', image: ASSETS.TikTokPost, dim: '1080 × 1920 px' }
    ],
    'Printables': [
        { name: 'Poster (Portrait)', image: ASSETS.Poster, dim: '42 × 59.4 cm' },
        { name: 'Flyer', image: ASSETS.Flyer, dim: '210 × 297 mm' },
        { name: 'Business Card', image: ASSETS.BusinessCard, dim: '85 × 50 mm' },
        { name: 'Trifold Brochure', image: ASSETS.Trifold, dim: 'US Letter' },
        { name: 'Certificate', image: ASSETS.Certificate, dim: 'A4 Landscape' },
        { name: 'Invitation', image: ASSETS.Invitation, dim: '14 × 14 cm' }
    ],
    'Docs': [
        { name: 'Doc', image: ASSETS.Doc, dim: 'A4' },
        { name: 'Document', image: ASSETS.Document, dim: 'A4' }
    ],
    'Whiteboards': [
        { name: 'Whiteboard', image: ASSETS.Whiteboard, dim: 'Infinite' }
    ],
    'Websites': [
        { name: 'Business Landing Page', image: 'https://template.canva.com/EAGWVAsQqpo/1/0/400w-SAbbixjDh0E.jpg', dim: '1366 × 768 px' },
        { name: 'Portfolio Site', image: 'https://template.canva.com/EAGWVFch3bs/1/0/400w-WTMaHRRrlYY.jpg', dim: '1366 × 768 px' },
        { name: 'Event Page', image: 'https://template.canva.com/EAGWVFe3dF8/1/0/400w-dS8KRTSbI-o.jpg', dim: '1366 × 768 px' },
        { name: 'Online Store', image: 'https://template.canva.com/EAGWVKdoiuE/1/0/400w-RzP9G19TZiI.jpg', dim: '1366 × 768 px' },
        { name: 'Bio Link Website', image: 'https://template.canva.com/EAGVZg-3NaY/2/0/320w-mCvLUmALe8s.jpg', dim: 'Mobile' }
    ],
    'Photo editor': [
        { name: 'Photo Collage', image: 'https://category-public.canva.com/icons/thumbnail_photo_collage_portrait.svg', dim: '25 × 20 cm' },
        { name: 'Desktop Wallpaper', image: ASSETS.BlogBanner, dim: '1920 × 1080 px' }
    ],
    'Sheets': [
        { name: 'Sheet', image: ASSETS.Sheet, dim: 'Spreadsheet' }
    ]
};

// --- DATA: MORE TEMPLATES (Bottom Section) ---
const TEMPLATES = [
    { name: 'Modern Business Strategy', type: 'Presentation', image: 'https://template.canva.com/EAGKo_LHhac/2/0/1067w-7_PPB0aCNzQ.jpg' },
    { name: 'Creative Portfolio', type: 'Website', image: 'https://template.canva.com/EAGWVFch3bs/1/0/400w-WTMaHRRrlYY.jpg' },
    { name: 'Tech Review Vlog', type: 'Video', image: 'https://template.canva.com/EAGQ8YBwGdY/1/0/900w-aiX9CLT2vzY.jpg' },
    { name: 'Minimalist Instagram Story', type: 'Social Media', image: 'https://template.canva.com/EAGVZg-3NaY/2/0/320w-mCvLUmALe8s.jpg' },
    { name: 'Corporate Pitch Deck', type: 'Presentation', image: 'https://template.canva.com/EAGXSyks_iQ/3/0/900w-v_eY_2V9psQ.jpg' },
    { name: 'Brand Guidelines', type: 'Presentation', image: 'https://template.canva.com/EAGhyOEucG0/2/0/900w-ZNB1XsJeEPg.jpg' },
    { name: 'Fashion Sale Story', type: 'Social Media', image: 'https://template.canva.com/EAGjWcGUYnI/1/0/225w-7CPckCKxnYs.jpg' },
    { name: 'Daily Quotes', type: 'Social Media', image: 'https://template.canva.com/EAGjXKstejo/1/0/400w-OsWi2Ygn6Z0.jpg' },
    { name: 'Travel Vlog Reel', type: 'Social Media', image: 'https://template.canva.com/EAGjXPfk1EE/1/0/225w-AbxyHFw1VxY.jpg' },
    { name: 'Podcast Promo', type: 'Social Media', image: 'https://template.canva.com/EAGjXrrThbU/1/0/400w-utL3XLcXJLY.jpg' },
    { name: 'Event Invitation', type: 'Social Media', image: 'https://template.canva.com/EAGjXuuolFI/1/0/225w-7Xg2bdr3sZI.jpg' },
    { name: 'Marketing Report', type: 'Presentation', image: 'https://template.canva.com/EAGksUUuMMk/3/0/900w-GjZg66kOxO8.jpg' },
    { name: 'Annual Report', type: 'Doc', image: 'https://document-export.canva.com/1kJoU/DAG8lg1kJoU/3/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260128%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260128T071943Z&X-Amz-Expires=88780&X-Amz-Signature=3a8453088bc0f40e578bdff09b2b95962f644e4389d7b1f78ed87c0e9c1efd94&X-Amz-SignedHeaders=host&response-expires=Thu%2C%2029%20Jan%202026%2007%3A59%3A23%20GMT' }
];

const SIDEBAR_ITEMS = [
    { name: 'For you', icon: <Icons.Magic /> },
    { name: 'Presentations', icon: <Icons.Presentation /> },
    { name: 'Social media', icon: <Icons.SocialMedia /> },
    { name: 'Photo editor', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> },
    { name: 'Videos', icon: <Icons.Video /> },
    { name: 'Printables', icon: <Icons.Printables /> },
    { name: 'Docs', icon: <Icons.Doc /> },
    { name: 'Whiteboards', icon: <Icons.Whiteboard /> },
    { name: 'Sheets', icon: <Icons.Sheet /> },
    { name: 'Websites', icon: <Icons.Website /> },
    { name: 'Custom size', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg> },
    { name: 'Upload', icon: <Icons.Upload /> },
];

export default function CreateDesignModal({ isOpen, onClose, initialCategory = 'For you', onOpenEditor }) {
    const [activeTab, setActiveTab] = useState(initialCategory);

    // Update active tab when initialCategory changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialCategory);
        }
    }, [initialCategory, isOpen]);

    // Memoize the content based on activeTab. Fallback to 'For you' content if category empty.
    const currentItems = useMemo(() => {
        return CATEGORY_CONTENT[activeTab] || CATEGORY_CONTENT['For you'];
    }, [activeTab]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[1100px] h-[90vh] flex flex-col relative z-50 overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">Create a design</h2>
                    <div className="flex-1 max-w-[500px] mx-8">
                        <div className="relative group">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#754DE8] transition-colors">
                                <Icons.Search />
                            </div>
                            <input
                                type="text"
                                placeholder="What would you like to create?"
                                className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-[#754DE8] rounded-md py-2.5 pl-11 pr-4 text-[15px] outline-none transition-all shadow-sm focus:shadow-md focus:ring-4 focus:ring-purple-50"
                                autoFocus
                            />
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <Icons.Close />
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex flex-1 overflow-hidden bg-white">
                    {/* Sidebar */}
                    <div className="w-[260px] flex-shrink-0 border-r border-gray-100 overflow-y-auto py-4 px-2 custom-scrollbar">
                        {SIDEBAR_ITEMS.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 mb-1 text-[14px] font-medium transition-all rounded-md ${activeTab === item.name
                                    ? 'bg-purple-50 text-[#754DE8]'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className={activeTab === item.name ? 'text-[#754DE8]' : 'text-gray-400'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto bg-white p-8 custom-scrollbar">

                        {/* Quick Actions (Only on 'For you') */}
                        {activeTab === 'For you' && (
                            <div className="mb-10">
                                <h3 className="text-base font-bold text-gray-900 mb-5">Quick actions</h3>
                                <div className="flex gap-4 overflow-visible pb-2">
                                    {QUICK_ACTIONS.map((action) => (
                                        <button key={action.name} className="flex flex-col items-center gap-2.5 min-w-[84px] group">
                                            <div className="w-[84px] h-[84px] rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-purple-200 transition-all duration-300">
                                                <img src={action.image} alt={action.name} className="w-10 h-10 object-contain" />
                                            </div>
                                            <span className="text-[12px] font-medium text-center text-gray-600 group-hover:text-gray-900">
                                                {action.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggested / Category Grid */}
                        <div className="mb-10">
                            <h3 className="text-base font-bold text-gray-900 mb-5">
                                {activeTab === 'For you' ? 'Suggested' : activeTab}
                            </h3>
                            <div className="grid grid-cols-3 gap-6">
                                {currentItems.map((item, idx) => (
                                    <div key={idx} className="group cursor-pointer" onClick={() => {
                                        // Parse dimensions or fallback
                                        let width = 1920;
                                        let height = 1080;

                                        if (item.dim) {
                                            const parts = item.dim.split(' × ');
                                            if (parts.length === 2) {
                                                const w = parseInt(parts[0].replace(/[^0-9]/g, ''));
                                                const h = parseInt(parts[1].replace(/[^0-9]/g, ''));
                                                if (!isNaN(w) && !isNaN(h)) {
                                                    width = w;
                                                    height = h;
                                                }
                                            } else if (item.dim === 'Square') {
                                                width = 1080;
                                                height = 1080;
                                            } else if (item.dim === 'Infinite' || item.dim === 'A4' || item.dim === 'US Letter') {
                                                // Handled by name in Editor, but let's pass dummy
                                                width = 0;
                                                height = 0;
                                            } else if (item.dim === 'Mobile') {
                                                width = 1080;
                                                height = 1920;
                                            }
                                        }

                                        onOpenEditor({
                                            name: item.name,
                                            type: activeTab,
                                            width: width,
                                            height: height
                                        });
                                        onClose();
                                    }}>
                                        <div className="bg-[#F2F3F5] rounded-xl mb-3 shadow-sm group-hover:shadow-lg group-hover:ring-2 group-hover:ring-[#754DE8] transition-all duration-300 relative overflow-hidden flex items-center justify-center h-[200px]">
                                            <div className="w-full h-full p-8 flex items-center justify-center">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                                <div className="bg-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                    <span className="text-[13px] font-bold text-gray-900">Create</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-1">
                                            <p className="text-[14px] font-semibold text-gray-900 group-hover:text-[#754DE8] truncate transition-colors">{item.name}</p>
                                            <p className="text-[12px] text-gray-500 mt-0.5 font-medium">{item.dim}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* NEW TEMPLATES SECTION */}
                        {activeTab === 'For you' && (
                            <div className="mb-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-base font-bold text-gray-900">Templates for you</h3>
                                    <button className="text-[13px] font-semibold text-gray-500 hover:text-[#754DE8] hover:underline transition-all">See all</button>
                                </div>
                                <div className="grid grid-cols-4 gap-6">
                                    {TEMPLATES.map((template, idx) => (
                                        <div key={idx} className="group cursor-pointer">
                                            <div className="aspect-[4/3] bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden mb-2.5">
                                                <div className="absolute inset-0 flex items-center justify-center p-6 bg-white">
                                                    <img src={template.image} alt={template.name} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                                </div>
                                                {/* Gradient overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                            </div>
                                            <h4 className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-[#754DE8] line-clamp-1">{template.name}</h4>
                                            <p className="text-[11px] text-gray-500 mt-0.5">{template.type}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
