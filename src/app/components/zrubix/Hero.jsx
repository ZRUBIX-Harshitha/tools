import React from 'react';

const Hero = () => {
    return (
        <>
            {/* Mobile Hero */}
            <div className="block lg:hidden">
                <section className="w-full min-h-[80vh] md:min-h-[70vh] overflow-hidden bg-[bisque] rounded-bl-[60px] md:rounded-bl-[100px] relative pb-12">
                    <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-6 px-6 py-12 md:py-20 text-center">
                        <div className="flex-1 max-w-[900px] text-center w-full">
                            <div>
                                <div>
                                    <div>
                                        <h1 className="text-[28px] sm:text-4xl md:text-5xl font-extrabold leading-[1.05] text-[#0f0f0f] mt-12 md:mt-16 text-center">
                                            Manage every&nbsp;
                                        </h1>
                                    </div>
                                </div>
                                <p className="mt-4 md:mt-6 text-[14px] md:text-[18px] text-[#0f0f0f]/90 max-w-[560px] md:max-w-[700px] mx-auto leading-relaxed">
                                    Zrubix is your one‑stop IT Services partner for setting up a unified Industry 4.0 data backbone, offering expert Zoho Solutions and human‑centric excellence for your MSME.
                                </p>
                            </div>
                            <div className="w-full max-w-[300px] md:max-w-[650px] mx-auto mt-8 md:mt-10">
                                <img
                                    alt="Hero"
                                    fetchPriority="high"
                                    width="800"
                                    height="600"
                                    decoding="async"
                                    className="w-full h-auto object-cover rounded-3xl bg-white"
                                    style={{ color: 'transparent' }}
                                    src="https://www.zrubix.com/_next/image?url=%2FHome%2FHome_Hero2.webp&w=3840&q=75"
                                />
                            </div>
                            <div> </div>
                            <div>
                                <div className="flex flex-row items-center justify-center gap-3 md:gap-5 mt-8 md:mt-10 mx-auto text-[12px] md:text-[16px]">
                                    <a
                                        className="inline-block bg-[#0f0f0f] text-white rounded-lg px-6 py-3 md:px-8 md:py-4 font-bold shadow-lg transition transform hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-105 focus:outline-none"
                                        aria-label="Sign up free"
                                        href="https://app.zrubix.com/signup"
                                    >
                                        Sign up free
                                    </a>
                                    <a
                                        className="inline-block border border-[#0f1720] text-[#0f1720] rounded-lg px-6 py-3 md:px-8 md:py-4 font-bold transition-colors hover:bg-[#0f1720] hover:text-white focus:outline-none"
                                        href="https://www.zrubix.com/contact-us"
                                    >
                                        Learn More
                                    </a>
                                </div>
                                <div className="mt-8 md:mt-12 flex flex-row items-center justify-center gap-3 mx-auto">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#0f1720] flex items-center justify-center text-white font-bold text-lg md:text-xl">
                                        Z
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="text-sm md:text-base font-bold">Loved by users everywhere</div>
                                        <div className="flex items-center justify-center md:justify-start gap-1 mt-1">
                                            <div className="font-bold text-sm md:text-lg">4.5</div>
                                            <div className="text-[#111] text-sm md:text-base">★★★★★</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Desktop Hero */}
            <div className="hidden lg:block">
                <section className="w-full h-[80vh] overflow-hidden bg-[bisque] rounded-bl-[60px] lg:rounded-bl-[120px] relative">
                    <div className="max-w-[1300px] h-full mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12">
                        <div className="flex-1 max-w-[900px] text-left grid z-20">
                            <div>
                                <div>
                                    <h1 className="text-4xl md:text-[42px] lg:text-[56px] font-extrabold leading-[1.05] text-[#0f0f0f] mt-12 text-left">
                                        Manage every&nbsp;
                                        <span
                                            aria-live="polite"
                                            style={{
                                                display: 'inline-block',
                                                minWidth: '180px',
                                                color: 'transparent',
                                                background: 'linear-gradient(90deg, #3e4095 0%, #3b82f6 50%, #008dd0 100%)',
                                                WebkitBackgroundClip: 'text',
                                                backgroundClip: 'text',
                                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                                opacity: 1,
                                                transform: 'translateY(0)',
                                            }}
                                        >
                                            Customer
                                        </span>
                                        <br />
                                        from one unified&nbsp;
                                    </h1>
                                </div>
                            </div>
                            <p className="mt-4 text-sm md:text-base lg:text-[15px] text-[#0f0f0f]/90 max-w-[560px]">
                                Zrubix is your one‑stop IT Services partner for setting up a unified Industry 4.0 data backbone, offering expert Zoho Solutions and human‑centric excellence for your MSME.
                            </p>
                            <div className="flex items-center gap-3 mt-4">
                                <a
                                    className="inline-block bg-[#0f0f0f] text-white rounded-lg px-4 py-2 font-bold shadow-lg transition transform hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-105 focus:outline-none"
                                    aria-label="Sign up free"
                                    href="https://app.zrubix.com/signup"
                                >
                                    Sign up free
                                </a>
                                <a
                                    className="inline-block border border-[#0f1720] text-[#0f1720] rounded-lg px-4 py-2 font-bold transition-colors hover:bg-[#0f1720] hover:text-white focus:outline-none"
                                    href="https://www.zrubix.com/contact-us"
                                >
                                    Learn More
                                </a>
                            </div>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-lg bg-[#0f1720] flex items-center justify-center text-white font-bold">
                                    Z
                                </div>
                                <div>
                                    <div className="text-base font-bold">Loved by users everywhere</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="font-bold">4.5</div>
                                        <div className="text-[#111]">★★★★★</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[45%] lg:w-[35%] relative z-10">
                            <img
                                alt="Hero decorative"
                                fetchPriority="high"
                                width="1920"
                                height="1080"
                                decoding="async"
                                className="hidden md:block absolute right-[-80%] top-[-180px] w-[210%] max-w-none object-cover h-auto"
                                style={{ color: 'transparent' }}
                                src="https://www.zrubix.com/_next/image?url=%2FHome%2FHome_Hero2.webp&w=3840&q=75"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Hero;
