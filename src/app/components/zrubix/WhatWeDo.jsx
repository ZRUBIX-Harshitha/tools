"use client";
import React from 'react';

const WhatWeDo = () => {
    const items = [
        {
            title: "Digital Presence",
            desc: "Build a compelling brand identity that works around the clock. We create responsive, SEO-optimized digital touchpoints that ensure your business is visible, credible, and easily accessible to your global audience.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Fdigital_presence.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=digital_presence"
        },
        {
            title: "Lead Management",
            desc: "Stop lead leakage and start converting. We implement automated sales pipelines that capture, track, and nurture prospects from first contact to final sale, giving you clear visibility into revenue forecasts.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Flead_management.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=lead_management"
        },
        {
            title: "Omnichannel Support",
            desc: "Unify conversations across email, social media, chat, and phone into a single interface. We help you deliver consistent, human-centric support that boosts customer satisfaction without overwhelming your team.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Fomnichannel_support.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=omnichannel_support"
        },
        {
            title: "Stakeholders Management",
            desc: "Streamline collaboration with vendors, partners, and investors. We provide centralized portals for transparent communication and contract management, strengthening your business ecosystem.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Fstakeholders_management.png&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=stakeholders_management"
        },
        {
            title: "Asset Management",
            desc: "Gain total visibility over your physical and digital assets. From procurement to maintenance, we help you track lifecycles, optimize usage, and prevent downtime for your critical infrastructure.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Fasset_management.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=asset_management"
        },
        {
            title: "Work Management",
            desc: "Replace chaotic spreadsheets with structured, intelligent workflows. We enable real-time project tracking and team collaboration, ensuring deadlines are met and operations run smoothly.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Fwork_management.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=work_management"
        },
        {
            title: "Human Resource Management",
            desc: "Automate the \"hire-to-retire\" journey with a focus on people. We digitize attendance, payroll, and performance tracking, freeing up your time to focus on employee engagement and culture.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Fhuman_resources_management.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=human_resource_management"
        },
        {
            title: "Finance Management",
            desc: "Connect front-line operations directly to your bottom line. We automate invoicing, expense tracking, and compliance, providing real-time financial health checks for smarter decision-making.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Ffinance_management.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=finance_management"
        },
        {
            title: "Database Management",
            desc: "Consolidate scattered data into a single, secure backbone on robust Zoho servers. We ensure your data is accurate, protected, and instantly accessible to power Industry 4.0 analytics.",
            img: "https://www.zrubix.com/_next/image?url=%2FAreasWeEmpower%2Fdatabase_management.webp&w=828&q=75",
            link: "https://www.zrubix.com/areas-we-empower-details?name=database_management"
        }
    ];

    return (
        <>
            <div className="bg-[bisque]">
                <div className="max-w-[1350px] mx-auto text-black what-we-do-text">
                    <div className="text-3xl md:text-4xl font-extrabold leading-tight p-6 md:p-12 md:pl-15">
                        What We Do — Integrated Digital Solutions
                    </div>
                    <div className="description m-0 p-6 pt-0 md:p-12 md:pt-0 md:pl-15 text-black text-lg max-w-7xl">
                        We help organisations replace fragmentation with a single, intelligent operational system that manages people, partners, processes and assets across their entire lifecycle. Our focus is on connecting front-line operations to finance, supply and customer-facing functions so teams have the right data, workflows and engagement tools to act quickly and confidently.
                    </div>
                </div>
            </div>

            <div className="horizontal-section relative w-full overflow-x-hidden bg-white">
                {/* We use overflow-x-auto to allow horizontal scrolling on all devices, mimicking the behavior */}
                <div className="w-full flex items-center overflow-x-auto hide-scrollbar py-20 px-4 md:px-0">
                    <div className="flex z-10 items-center gap-0">
                        {items.map((item, index) => (
                            <div key={index} className="item flex-none w-[320px] md:w-[420px] xl:w-[480px] border-r border-black/10 relative px-8 md:px-12 snap-center">
                                <div className="whatwe-item text-black text-base flex flex-col gap-6">
                                    <div className="grid-top flex items-center justify-center">
                                        {/* Swapping content/image based on index parity to match original alternating layout if implied, 
                            but looking at HTML, some have text first, some image first. 
                            Let's rely on the structure from HTML: 
                            - Digital Presence: Content Top, Image Bottom
                            - Lead Management: Image Top, Content Bottom
                            - Omnichannel: Content Top, Image Bottom
                            - Stakeholders: Image Top, Content Bottom
                            - Etc.
                            It alternates.
                        */}
                                        {index % 2 === 0 ? (
                                            <div className="item-content pl-0 md:pl-6">
                                                <h3 className="m-0 mb-3 text-xl md:text-2xl font-semibold text-inherit">{item.title}</h3>
                                                <p className="m-0 mb-4 text-inherit opacity-80 text-sm md:text-base leading-relaxed">{item.desc}</p>
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="read-more inline-flex items-center gap-2 font-semibold bg-black/5 px-3 py-1.5 rounded text-inherit no-underline hover:bg-black/10 transition-colors" aria-label={`Read more about ${item.title}`}>
                                                    <span>Read more <span className="sr-only">about {item.title}</span></span>
                                                    <svg className="w-3.5 h-3.5 transition-transform duration-150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="item-image w-full flex items-center justify-center py-4">
                                                <img
                                                    alt={item.title}
                                                    width="400"
                                                    height="200"
                                                    decoding="async"
                                                    className="w-auto h-auto max-h-[200px] max-w-full object-contain"
                                                    style={{ color: 'transparent' }}
                                                    src={item.img}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid-bottom flex items-center justify-center">
                                        {index % 2 === 0 ? (
                                            <div className="item-image w-full flex items-center justify-center py-4">
                                                <img
                                                    alt={item.title}
                                                    width="400"
                                                    height="200"
                                                    decoding="async"
                                                    className="w-auto h-auto max-h-[200px] max-w-full object-contain"
                                                    style={{ color: 'transparent' }}
                                                    src={item.img}
                                                />
                                            </div>
                                        ) : (
                                            <div className="item-content pl-0 md:pl-6">
                                                <h3 className="m-0 mb-3 text-xl md:text-2xl font-semibold text-inherit">{item.title}</h3>
                                                <p className="m-0 mb-4 text-inherit opacity-80 text-sm md:text-base leading-relaxed">{item.desc}</p>
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="read-more inline-flex items-center gap-2 font-semibold bg-black/5 px-3 py-1.5 rounded text-inherit no-underline hover:bg-black/10 transition-colors" aria-label={`Read more about ${item.title}`}>
                                                    <span>Read more <span className="sr-only">about {item.title}</span></span>
                                                    <svg className="w-3.5 h-3.5 transition-transform duration-150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex-none w-[120px]" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    );
};

export default WhatWeDo;
