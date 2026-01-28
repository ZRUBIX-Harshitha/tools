import React from 'react';

const FivePillars = () => {
    return (
        <section className="py-20 px-4 sm:px-8 lg:px-16 bg-white relative z-50">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0f0f0f]">Five Pillars of a Unified Enterprise</h2>

            <div className="max-w-7xl mx-auto">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-8">
                    <article className="bg-white border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[260px]" style={{ borderColor: '#3b2b7b', borderRadius: '0 18px 0 18px', boxShadow: 'inset 0 0 0 0 #3b2b7b' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-[#0f0f0f]">Growth &amp; Experience Platform</h3>
                            <div className="ml-4 flex-shrink-0">
                                <svg stroke="#3b2b7b" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="36" width="36" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
                                </svg>
                            </div>
                        </div>
                        <p className="text-[15px] text-gray-600 mb-4">Build a dominant digital presence that captures leads and keeps your brand visible 24/7 across all channels</p>
                        <div className="mt-auto">
                            <p className="font-semibold mb-2 text-sm text-[#0f0f0f]">Top features:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>SEO-optimized Web Presence</li>
                                <li>Omnichannel Lead Capture</li>
                                <li>Automated Nurture Campaigns</li>
                            </ul>
                        </div>
                    </article>

                    <article className="bg-white border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[260px]" style={{ borderColor: '#c94b36', borderRadius: '18px 0 18px 0', boxShadow: 'inset 0 0 0 0 #c94b36' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-[#0f0f0f]">Sales &amp; Stakeholder Command</h3>
                            <div className="ml-4 flex-shrink-0">
                                <svg stroke="#c94b36" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="36" width="36" xmlns="http://www.w3.org/2000/svg"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                            </div>
                        </div>
                        <p className="text-[15px] text-gray-600 mb-4">Centralize all your relationships—from prospects to partners—accelerating revenue and ensuring transparent collaboration</p>
                        <div className="mt-auto">
                            <p className="font-semibold mb-2 text-sm text-[#0f0f0f]">Top features:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Visual Sales Pipelines</li>
                                <li>Vendor &amp; Partner Portals</li>
                                <li>Contract Management</li>
                            </ul>
                        </div>
                    </article>

                    <article className="bg-white border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[260px]" style={{ borderColor: '#c84a7b', borderRadius: '0 18px 0 18px', boxShadow: 'inset 0 0 0 0 #c84a7b' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-[#0f0f0f]">Operational Excellence Hub</h3>
                            <div className="ml-4 flex-shrink-0">
                                <svg stroke="#c84a7b" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="36" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </div>
                        </div>
                        <p className="text-[15px] text-gray-600 mb-4">Replace operational chaos with streamlined workflows that track every project and physical asset in real-time</p>
                        <div className="mt-auto">
                            <p className="font-semibold mb-2 text-sm text-[#0f0f0f]">Top features:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Asset Lifecycle Tracking</li>
                                <li>Smart Project Workflows</li>
                                <li>Preventative Maintenance</li>
                            </ul>
                        </div>
                    </article>
                </div>

                {/* Row 2 (Centered 2 items) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[880px] mx-auto">
                    <article className="bg-white border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[260px]" style={{ borderColor: '#1e68a3', borderRadius: '18px 0 18px 0', boxShadow: 'inset 0 0 0 0 #1e68a3' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-[#0f0f0f]">Human-Centric HR System</h3>
                            <div className="ml-4 flex-shrink-0">
                                <svg stroke="#1e68a3" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="36" width="36" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            </div>
                        </div>
                        <p className="text-[15px] text-gray-600 mb-4">Automate the 'hire-to-retire' journey, ensuring your people are paid, performance-tracked, and engaged without the paperwork</p>
                        <div className="mt-auto">
                            <p className="font-semibold mb-2 text-sm text-[#0f0f0f]">Top features:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Automated Payroll &amp; Compliance</li>
                                <li>Attendance &amp; Leave Tracking</li>
                                <li>Performance Management</li>
                            </ul>
                        </div>
                    </article>

                    <article className="bg-white border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[260px]" style={{ borderColor: '#227a6b', borderRadius: '0 18px 0 18px', boxShadow: 'inset 0 0 0 0 #227a6b' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-[#0f0f0f]">Finance &amp; Intelligence Core</h3>
                            <div className="ml-4 flex-shrink-0">
                                <svg stroke="#227a6b" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="36" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                        </div>
                        <p className="text-[15px] text-gray-600 mb-4">Connect front-line actions to your bottom line with a secure data backbone that provides instant financial clarity</p>
                        <div className="mt-auto">
                            <p className="font-semibold mb-2 text-sm text-[#0f0f0f]">Top features:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Automated Invoicing &amp; Expenses</li>
                                <li>Real-time Financial Analytics</li>
                                <li>Centralized Data Backbone</li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default FivePillars;
