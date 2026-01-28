import React from 'react';

const Footer = () => {
    return (
        <footer className="relative bg-white text-black transition-colors duration-500 border-t border-black/10">
            <div className="w-full">
                <div className="max-w-[1350px] mx-auto px-6 py-8 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[260px_1fr_auto] gap-8 items-start">
                        {/* Column 1: Brand & Contact */}
                        <div className="space-y-6 md:max-w-none lg:max-w-[260px] md:col-span-1 lg:col-span-1">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Zrubix</h2>
                                <p className="mt-4 max-w-xs text-gray-600">Trusted IT Solutions for a Lifetime of Innovation</p>
                            </div>
                            <div>
                                <div className="mt-4 text-[13px] space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center justify-center h-8 w-8 p-2 rounded-full bg-black/5 text-black shadow-sm">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-lg" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path></svg>
                                        </span>
                                        <div className="text-black">Salem</div>
                                    </div>
                                    <a href="mailto:support@zrubix.com" className="flex items-center gap-3 group cursor-pointer w-fit">
                                        <span className="inline-flex items-center justify-center h-8 w-8 p-1 rounded-full bg-black/5 text-black shadow-sm group-hover:scale-110 transition-transform">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-lg" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                                        </span>
                                        <span className="text-black group-hover:underline transition-all">support@zrubix.com</span>
                                    </a>
                                    <a href="https://wa.me/918248658058" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group cursor-pointer w-fit">
                                        <span className="inline-flex items-center justify-center h-8 w-8 p-1 rounded-full bg-black/5 text-black shadow-sm group-hover:scale-110 transition-transform">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-lg" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"></path></svg>
                                        </span>
                                        <span className="text-black group-hover:underline transition-all">+91 82486 58058</span>
                                    </a>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-sm font-bold text-black">Subscribe to our Newsletter</h3>
                                <form className="mt-3 flex items-center max-w-sm">
                                    <label htmlFor="footer-email" className="sr-only">Email address</label>
                                    <input id="footer-email" type="email" placeholder="Email Address" className="flex-1 rounded-l-md px-4 h-10 placeholder:text-gray-500 bg-transparent border border-black/20 focus:border-black focus:outline-none focus:ring-0 text-current disabled:opacity-50" />
                                    <button type="submit" aria-label="Subscribe" className="bg-black text-white rounded-r-md px-4 h-10 border-none flex items-center justify-center disabled:opacity-50">
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Column 2: Links */}
                        <div className="grid grid-cols-2 gap-8 w-full md:w-auto md:col-span-1 lg:col-auto lg:flex lg:gap-12 lg:pl-7 pl-0">
                            {/* Mobile Only Links Block */}
                            <div className="lg:hidden">
                                <h4 className="text-sm font-semibold text-current">QUICK LINKS</h4>
                                <ul className="mt-4 space-y-2 text-[13px] text-gray-600">
                                    <li>Home</li>
                                    <li>About</li>
                                    <li>Areas We Empower</li>
                                    <li>Products</li>
                                    <li>Integration</li>
                                    <li>Features</li>
                                    <li><a href="https://www.zrubix.com/zoho">Zoho Services</a></li>
                                    <li>Tools</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-current">AREAS WE EMPOWER</h4>
                                <ul className="mt-4 space-y-2 text-[13px] text-gray-600">
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=digital_presence">Digital Presence</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=lead_management">Lead Management</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=omnichannel_support">Omnichannel Support</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=stakeholders_management">Stakeholders Management</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=asset_management">Asset Management</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=work_management">Work Management</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=human_resources_management">HR Management</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=finance_management">Finance Management</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/areas-we-empower-details?name=database_management">Database Management</a></li>
                                </ul>
                            </div>

                            <div className="md:hidden lg:block">
                                <h4 className="text-sm font-semibold text-current">PRODUCTS</h4>
                                <ul className="mt-4 space-y-2 text-[13px] text-gray-600">
                                    <li><a target="_blank" href="https://www.zrubix.com/product-details?name=website">Website</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/product-details?name=ecommerce">E-Commerce</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/product-details?name=chatbots">Chatbots</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/product-details?name=custom-apps">Custom Applications</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/product-details?name=extensions">Extensions</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/product-details?name=mobile-apps">Mobile Apps</a></li>
                                </ul>
                            </div>

                            <div className="md:hidden lg:block">
                                <h4 className="text-sm font-semibold text-current">INTEGRATION</h4>
                                <ul className="mt-4 text-[13px] space-y-2 text-gray-600">
                                    <li><a target="_blank" href="https://www.zrubix.com/integration-details?name=whatsapp">Whatsapp</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/integration-details?name=telegram">Telegram</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/integration-details?name=ivr">IVR</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/integration-details?name=ai">AI</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/integration-details?name=payment_gateway">Payment Gateway</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/integration-details?name=social_integration">Social Media Platforms</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/zoho">Zoho Applications</a></li>
                                    <li><a target="_blank" href="https://www.zrubix.com/integration-details?name=saas_api_integration">SaaS Apps with API</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: More Links & Logos */}
                        <div className="flex flex-col justify-between md:col-span-2 lg:col-span-1 lg:col-auto">
                            <div className="md:col-span-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-6">
                                <div className="hidden md:block lg:hidden">
                                    <h4 className="text-sm font-semibold text-current">PRODUCTS</h4>
                                    <ul className="mt-4 space-y-2 text-[13px] text-gray-600">
                                        <li>Website</li><li>E-Commerce</li><li>Chatbots</li><li>Custom Applications</li>
                                    </ul>
                                </div>
                                <div className="">
                                    <h4 className="text-sm font-semibold text-current">FEATURES</h4>
                                    <ul className="mt-4 text-[13px] space-y-2 text-gray-600">
                                        <li>Location Tracking</li><li>AB Access Control</li><li>Advanced Analytics</li><li>Passwordless Login</li>
                                        <li>Sandbox Environment</li><li>Custom Printing</li><li>Version Control</li><li>Audit Logs</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-current">QUICK LINKS</h4>
                                    <ul className="mt-4 space-y-2 text-[13px] text-gray-600">
                                        <li>Home</li><li>Areas We Empower</li><li>Products</li><li>Integration</li>
                                        <li>Features</li><li>Clients</li><li>Downloads</li><li>Zoho Services</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="hidden lg:flex mt-5 mb-0 items-center bg-white rounded-lg px-6 py-4 gap-6">
                                <img alt="Zrubix Partner Logo" width="80" height="80" className="w-auto h-[80px] object-contain" src="https://www.zrubix.com/_next/image?url=%2FHeader%2Fzrubix_logo.webp&w=256&q=75" />
                                <div className="h-[60px] w-[1px] bg-gray-300"></div>
                                <img alt="Zoho Authorized Partner" width="220" height="80" className="w-[220px] h-auto object-contain" src="https://www.zrubix.com/_next/image?url=%2FHeader%2Fauthorized-badge.png&w=640&q=75" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-black/10">
                <div className="max-w-7xl mx-auto px-6 py-6 md:py-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 items-center text-sm">
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-black">
                        <a target="_blank" href="https://www.zrubix.com/terms_and_conditions">Terms</a>
                        <a target="_blank" href="https://www.zrubix.com/privacy_policy">Privacy</a>
                        <a target="_blank" href="https://www.zrubix.com/refund_policy">Refund</a>
                    </div>
                    <div className="flex justify-center items-center text-gray-600">
                        Developed by Zrubix Solutions Pvt Ltd
                    </div>
                    <div className="text-center md:text-right text-gray-600">
                        © 2026, All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
