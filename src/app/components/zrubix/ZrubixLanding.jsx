import React from 'react';
import Hero from './Hero';
import ClientLogos from './ClientLogos';
import WhoAreWe from './WhoAreWe';
import WhatWeDo from './WhatWeDo';
import StickyScroll from './StickyScroll';
import FivePillars from './FivePillars';
import DiscoveryDiagnosis from './DiscoveryDiagnosis';
import TheShift from './TheShift';
import Integrations from './Integrations';
import Footer from './Footer';

const ZrubixLanding = () => {
    return (
        <div className="font-sans antialiased text-[#0f0f0f] bg-white">
            <main>
                <Hero />
                <ClientLogos />
                <WhoAreWe />
                <WhatWeDo />
                <StickyScroll />
                <FivePillars />
                <DiscoveryDiagnosis />
                <TheShift />
                <Integrations />
            </main>
            <Footer />
        </div>
    );
};

export default ZrubixLanding;
