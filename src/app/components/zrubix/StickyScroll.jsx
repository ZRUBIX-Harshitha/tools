import React from 'react';

const StickyScroll = () => {
    return (
        <section>
            <div className="relative w-full">
                {/* 
                    The Original HTML had a wrapper h-[500vh] to creating scrolling space. 
                    Since we aren't using scroll-jacking/scrubbing animations, we can rely on standard sticky behavior.
                    We just need ensuring the parent is tall enough or just let them stack naturally.
                    Actually, `sticky` works best when elements are in a flow.
                    The design has them overlapping each other with rounding.
                */}

                <section className="sticky top-20 h-screen w-full flex items-center justify-center text-center bg-[bisque] text-black rounded-tl-[60px] md:rounded-tl-[200px] -mb-[80vh] z-10 border-t border-black/5">
                    <div className="max-w-3xl px-6 py-16 text-base md:text-lg lg:text-xl leading-relaxed">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Move from <br /> "I think" to "I know."</h2>
                        <p>Eliminate guesswork with real-time analytics that give you a single version of the truth. Whether it’s financial health or inventory levels, access precise data instantly to make smarter, faster decisions that keep you ahead of the competition.</p>
                    </div>
                </section>

                <section className="sticky top-24 h-screen w-full flex items-center justify-center text-center bg-white text-black rounded-tl-[60px] md:rounded-tl-[200px] -mb-[80vh] z-20 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="max-w-3xl px-6 py-16 text-base md:text-lg lg:text-xl leading-relaxed mb-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Do more with <br /> the team you have.</h2>
                        <p>We automate repetitive administrative tasks—from data entry to invoicing—freeing your workforce to focus on high-value activities. By reducing manual friction, you increase speed and reduce human error, ensuring your operations run like a well-oiled machine.</p>
                    </div>
                </section>

                <section className="sticky top-28 h-screen w-full flex items-center justify-center text-center bg-[bisque] text-black rounded-tl-[60px] md:rounded-tl-[200px] -mb-[80vh] z-30 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="max-w-3xl px-6 py-16 text-base md:text-lg lg:text-xl leading-relaxed mb-20">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Grow your revenue, <br /> not your workload.</h2>
                        <p>Many MSMEs fear that growing bigger means more confusion. Our systems are built to scale with you. Whether you are managing 10 clients or 10,000, our infrastructure provides the stability and control you need to expand effortlessly without breaking your existing processes.</p>
                    </div>
                </section>

                <section className="sticky top-32 h-screen w-full flex items-center justify-center text-center bg-white text-black rounded-tl-[60px] md:rounded-tl-[200px] -mb-[80vh] z-40 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="max-w-3xl px-6 py-16 text-base md:text-lg lg:text-xl leading-relaxed mb-30">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Connect your people, <br />partner with purpose.</h2>
                        <p>Fragmentation kills productivity. We break down the walls between departments—connecting your front-line staff with your finance and supply teams. This creates a unified work culture where data flows freely, enabling seamless collaboration and faster problem-solving.</p>
                    </div>
                </section>

                <section className="sticky top-36 h-screen w-full flex items-center justify-center text-center bg-[bisque] text-black rounded-tl-[60px] md:rounded-tl-[200px] z-50 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="max-w-3xl px-6 py-16 text-base md:text-lg lg:text-xl leading-relaxed">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Enterprise-grade protection for every size.</h2>
                        <p>Security shouldn't be a luxury. Backed by robust Zoho servers, we ensure your proprietary data is locked down with bank-grade encryption and compliance standards. You get total control over access rights, keeping your business safe from digital threats while remaining accessible to authorized users.</p>
                    </div>
                </section>

                {/* Spacer to allow the last element to be fully viewed before next section takes over, if needed. 
                    Actually, since the last one is NOT sticky (it just flows), it will scroll up naturally. 
                    Wait, if I make it sticky, it stays there. 
                    The original HTML had `sticky` on ALL of them.
                    So they stack.
                */}
            </div>
            {/* Added extra padding bottom to ensure we can scroll past the stack comfortably */}
            <div className="h-[20vh]"></div>
        </section>
    );
};

export default StickyScroll;
