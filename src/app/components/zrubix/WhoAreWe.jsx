import React from 'react';

const WhoAreWe = () => {
    return (
        <section className="bg-white py-14 p-6 md:p-12 lg:p-20 relative overflow-hidden">
            <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 relative z-10">
                    <div className="text-[12px] md:text-[14px] font-bold tracking-[0.2em] text-[#0f0f0f] uppercase mb-4 opacity-70">
                        Who are we?
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f0f0f] leading-tight mb-6">
                        Bridging the Gap Between <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Potential &amp; Performance
                        </span>
                    </h2>
                    <p className="text-[#0f0f0f]/80 text-base md:text-lg leading-relaxed mb-6">
                        We are a team of technologists, strategists, and problem-solvers dedicated to one mission: simplifying complexity. We believe that technology should not just exist; it should empower.
                    </p>
                    <p className="text-[#0f0f0f]/80 text-base md:text-lg leading-relaxed">
                        By combining deep industry expertise with the versatile power of the Zoho ecosystem, we build digital infrastructures that are robust, scalable, and intuitive.
                    </p>

                    <div className="mt-8">
                        <a href="https://www.zrubix.com/about-us" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0f0f0f] hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            More About Us
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative">
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31265.67911762193!2d78.135266!3d11.607214!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1cc7c6b553d%3A0x892dd503cb37719c!2sZrubix%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1734689620023!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full object-cover"
                        ></iframe>
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[bisque] rounded-full z-0 opacity-50 blur-2xl"></div>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full z-0 opacity-50 blur-2xl"></div>
                </div>
            </div>
        </section>
    );
};

export default WhoAreWe;
