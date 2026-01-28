import React from 'react';

const ClientLogos = () => {
    // Array of logo data to map over for cleaner code, extracted from HTML
    const logos = [
        { alt: "logo-0", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FOMM_IT_Solutions.png&w=256&q=75" },
        { alt: "logo-1", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FKarma_Group_Resorts.png&w=256&q=75" },
        { alt: "logo-2", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FBeconnected.png&w=256&q=75" },
        { alt: "logo-3", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FKrones_AG.png&w=256&q=75" },
        { alt: "logo-4", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FWheelie_Campers.png&w=256&q=75" },
        { alt: "logo-5", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FBarometer.png&w=256&q=75" },
        { alt: "logo-6", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FMivi_Logo.png&w=256&q=75" },
        { alt: "logo-7", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FNaiduHall.png&w=256&q=75" },
        { alt: "logo-8", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FeShipz.png&w=256&q=75" },
        { alt: "logo-9", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FGopi_Hospital.png&w=256&q=75" },
        { alt: "logo-10", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FAkgim.png&w=256&q=75" },
        { alt: "logo-11", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FRA_Exports.png&w=256&q=75" },
        // Repeat loop for seamless scroll effect as seen in HTML (actually HTML repeats it 3 times approx)
        { alt: "logo-12", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FOMM_IT_Solutions.png&w=256&q=75" },
        { alt: "logo-13", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FKarma_Group_Resorts.png&w=256&q=75" },
        { alt: "logo-14", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FBeconnected.png&w=256&q=75" },
        { alt: "logo-15", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FKrones_AG.png&w=256&q=75" },
        { alt: "logo-16", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FWheelie_Campers.png&w=256&q=75" },
        { alt: "logo-17", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FBarometer.png&w=256&q=75" },
        { alt: "logo-18", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FMivi_Logo.png&w=256&q=75" },
        { alt: "logo-19", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FNaiduHall.png&w=256&q=75" },
        { alt: "logo-20", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FeShipz.png&w=256&q=75" },
        { alt: "logo-21", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FGopi_Hospital.png&w=256&q=75" },
        { alt: "logo-22", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FAkgim.png&w=256&q=75" },
        { alt: "logo-23", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FRA_Exports.png&w=256&q=75" },
        { alt: "logo-24", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FOMM_IT_Solutions.png&w=256&q=75" },
        { alt: "logo-25", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FKarma_Group_Resorts.png&w=256&q=75" },
        { alt: "logo-26", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FBeconnected.png&w=256&q=75" },
        { alt: "logo-27", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FKrones_AG.png&w=256&q=75" },
        { alt: "logo-28", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Finternational%2FWheelie_Campers.png&w=256&q=75" },
        { alt: "logo-29", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FBarometer.png&w=256&q=75" },
        { alt: "logo-30", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FMivi_Logo.png&w=256&q=75" },
        { alt: "logo-31", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FNaiduHall.png&w=256&q=75" },
        { alt: "logo-32", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fdomestic%2FeShipz.png&w=256&q=75" },
        { alt: "logo-33", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FGopi_Hospital.png&w=256&q=75" },
        { alt: "logo-34", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FAkgim.png&w=256&q=75" },
        { alt: "logo-35", url: "https://www.zrubix.com/_next/image?url=%2FClients%2Fregional%2FRA_Exports.png&w=256&q=75" },

    ];

    return (
        <>
            {/* Mobile Component */}
            <div className="block lg:hidden">
                <section className="w-full bg-white py-6 min-h-[20vh] content-center">
                    <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-6 px-4 text-center">
                        <div className="w-full">
                            <h2 className="m-0 text-[#0f1720] font-bold text-[1rem] sm:text-[1.2rem] md:text-[1.5rem]">
                                Join 50+ customers around the world who trust Zrubix
                            </h2>
                        </div>
                        <div className="mobile-carousel-container w-full">
                            <div className="mobile-carousel-track">
                                {logos.map((logo, index) => (
                                    <div key={index} className="mobile-carousel-slide text-[#9aa0a6] font-semibold">
                                        <img
                                            alt={logo.alt}
                                            loading="lazy"
                                            width="100"
                                            height="32"
                                            decoding="async"
                                            className="max-h-8 md:max-h-12 object-contain w-auto"
                                            style={{ color: 'transparent' }}
                                            src={logo.url}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Desktop Component */}
            <div className="hidden lg:block">
                <section className="w-full bg-white py-6 h-[20vh] content-center">
                    <div className="max-w-[1300px] mx-auto flex items-center justify-between gap-6 px-4">
                        <div className="w-1/3">
                            <h2 className="m-0 text-[#0f1720] font-bold text-[1.2rem]">
                                Join 50+ customers around the world who trust Zrubix
                            </h2>
                        </div>
                        <div className="w-2/3">
                            <div className="desktop-carousel-container w-full">
                                <div className="desktop-carousel-track">
                                    {logos.map((logo, index) => (
                                        <div key={index} className="desktop-carousel-slide text-[#9aa0a6] font-semibold">
                                            <img
                                                alt={logo.alt}
                                                loading="lazy"
                                                width="120"
                                                height="40"
                                                decoding="async"
                                                className="object-contain" // Height styles from inline
                                                style={{ color: 'transparent', height: '40px', width: 'auto' }}
                                                src={logo.url}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ClientLogos;
