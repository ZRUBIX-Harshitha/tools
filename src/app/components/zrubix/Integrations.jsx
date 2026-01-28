"use client";
import React from 'react';

const Integrations = () => {
    const logos = [
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Famazon.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FFlipkart-Logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FGoogle-Pay-logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FMeta-Logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FPaytm.webp&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FPhonePe_Logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Ftelegram.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Fwhatsapp.webp&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Fzoho.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Fzohopayments.png&w=256&q=75",
        // Repeat for marquee
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Famazon.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FFlipkart-Logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FGoogle-Pay-logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FMeta-Logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FPaytm.webp&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2FPhonePe_Logo.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Ftelegram.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Fwhatsapp.webp&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Fzoho.png&w=256&q=75",
        "https://www.zrubix.com/_next/image?url=%2FHome%2FIntegrationRow%2Fzohopayments.png&w=256&q=75"
    ];

    return (
        <>
            <section className="w-full bg-[floralwhite] rounded-t-[60px] lg:rounded-t-[120px] pb-10">
                <div className="px-6 md:px-12 py-14 md:py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Zrubix connects to the tools you already use</h2>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">Zrubix runs alongside more than 150 leading digital tools, from CRM to CMS, ecommerce, and more.</p>
                    <div className="mt-10 overflow-hidden relative">
                        <div className="flex items-center gap-10 w-max animate-marquee" style={{ animation: 'marquee 30s linear infinite' }}>
                            {logos.map((url, i) => (
                                <div key={i} className="w-20 h-12 flex items-center justify-center flex-shrink-0">
                                    <img
                                        alt=""
                                        loading="lazy"
                                        width="80"
                                        height="48"
                                        decoding="async"
                                        className="object-contain hover:grayscale-0 transition-all duration-300 w-full h-full transform-gpu hover:scale-105 cursor-pointer"
                                        style={{ color: 'transparent' }}
                                        src={url}
                                    />
                                </div>
                            ))}
                        </div>
                        <style jsx>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                             animation: marquee 30s linear infinite;
                        }
                        .animate-marquee:hover {
                            animation-play-state: paused;
                        }
                    `}</style>
                    </div>
                    <div className="mt-12">
                        <a className="text-sm px-6 py-3 rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition cursor-pointer font-bold" href="https://www.zrubix.com/integration">See integrations</a>
                    </div>
                </div>

                <div className="rounded-t-[60px] lg:rounded-t-[120px] px-6 md:px-12 py-14 md:py-20 text-center mx-4 md:mx-8 -mt-8" style={{ backgroundColor: 'bisque' }}>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Ready to grow with Zrubix?</h3>
                    <p className="mt-4 text-gray-700 max-w-3xl mx-auto">Connect with customers, convert leads, and drive business growth with Zrubix's IT Services and Zoho Solutions — all from one platform.</p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://app.zrubix.com/signup" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-black text-white shadow-md hover:shadow-lg transition cursor-pointer font-bold">Sign up free</button>
                        </a>
                        <a href="https://www.zrubix.com/contact-us" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition cursor-pointer font-bold">Get a demo</button>
                        </a>
                    </div>
                    <div className="mt-4 text-sm text-gray-700">No credit card required.</div>
                </div>
            </section>
        </>
    );
};

export default Integrations;
