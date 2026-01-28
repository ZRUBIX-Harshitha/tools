import React from 'react';

const DiscoveryDiagnosis = () => {
    return (
        <section className="relative w-full overflow-hidden z-20">
            {/* 
        Original was a scroll-jacked panel container. 
        Converted to a vertical stack for mobile and a 2x2 grid or horizontal sequence for desktop for better usability without external libraries.
        Actually, let's do a Full Width Stack for each step, alternating colors, to give it that "panel" feel.
      */}

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 min-h-[50vh] md:min-h-auto">
                <div className="bg-[bisque] py-16 px-6 flex items-center justify-center text-center h-auto md:min-h-[400px]">
                    <div className="max-w-md">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Discovery &amp; Diagnosis</h2>
                        <p className="text-base lg:text-lg text-gray-800">We don't guess; we analyze. We sit down with your team to understand your current pain points, workflow bottlenecks, and data gaps.</p>
                    </div>
                </div>
                <div className="bg-white py-16 px-6 flex items-center justify-center text-center h-auto md:min-h-[400px]">
                    <div className="max-w-md">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Custom Blueprinting</h2>
                        <p className="text-base lg:text-lg text-gray-800">We design a tailored Industry 4.0 roadmap. No cookie-cutter solutions—just a strategy that fits your specific operational needs and budget.</p>
                    </div>
                </div>
                <div className="bg-[bisque] py-16 px-6 flex items-center justify-center text-center h-auto md:min-h-[400px]">
                    <div className="max-w-md">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Seamless Implementation</h2>
                        <p className="text-base lg:text-lg text-gray-800">We build and deploy your unified system on secure Zoho servers. We ensure your data is migrated safely with zero downtime for your daily operations.</p>
                    </div>
                </div>
                <div className="bg-white py-16 px-6 flex items-center justify-center text-center h-auto md:min-h-[400px]">
                    <div className="max-w-md">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Training &amp; Evolution</h2>
                        <p className="text-base lg:text-lg text-gray-800">We don't just hand over the keys and leave. We train your staff to use the tools confidently and provide ongoing support as your business scales.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscoveryDiagnosis;
