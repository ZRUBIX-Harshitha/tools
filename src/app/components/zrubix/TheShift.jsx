import React from 'react';

const TheShift = () => {
    const shifts = [
        {
            title: "Operational Workflow",
            subtitle: "Streamlining Daily Execution",
            before: "\"Our day-to-day operations were a tangled mess of disconnected spreadsheets, endless email threads, and verbal instructions that often got lost. We struggled to track who was doing what, leading to missed deadlines and constant firefighting.\"",
            after: "\"Workflows are centralized on a single interface where tasks are auto-assigned and progress is tracked in real-time. Total visibility over shop floor and office operations eliminates the need to chase manual updates.\"",
            img: "https://www.zrubix.com/_next/image?url=%2FHome%2FShift%2F1st_image.webp&w=128&q=75"
        },
        {
            title: "Sales Ecosystem",
            subtitle: "Maximizing Revenue Potential",
            before: "\"We were losing potential business simply because we couldn't keep up. Leads from our website would sit in an inbox for days, follow-ups were forgotten in the busy schedule, and customer details were scattered across sticky notes and personal phones.\"",
            after: "\"The entire sales pipeline runs on full automation. Leads are captured and nurtured instantly, ensuring zero missed opportunities while providing accurate, at-a-glance revenue forecasts for the entire management team.\"",
            img: "https://www.zrubix.com/_next/image?url=%2FHome%2FShift%2F2nd_image.webp&w=128&q=75"
        },
        {
            title: "Strategic Insight",
            subtitle: "Data-Driven Confidence",
            before: "\"Making business decisions felt like gambling because our data was always weeks old or inaccurate. We had to manually merge reports from finance, inventory, and sales to get a clear picture, a process that was slow and prone to human error.\"",
            after: "\"A single source of truth connects finance directly to operations through real-time dashboards. Business decisions are driven by live data and immediate profitability insights rather than outdated reports or guesswork.\"",
            img: "https://www.zrubix.com/_next/image?url=%2FHome%2FShift%2F3rd_image.webp&w=128&q=75"
        }
    ];

    return (
        <section className="w-full px-4 sm:w-[90%] sm:mx-auto py-5 bg-white">
            <div className="max-w-7xl mx-auto p-6 md:p-12 relative">
                <div className="text-center mb-8">
                    <div className="inline-block px-3 py-1 rounded-full bg-purple-50 text-sm font-bold mb-4 text-[#0f0f0f]">The Shift</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f]">Real Struggles. Real Shifts. Real Control.</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shifts.map((item, index) => (
                        <div key={index} className="rounded-lg bg-slate-50 p-4 md:p-5 shadow-sm relative transition-shadow hover:shadow-md">
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    alt={item.title}
                                    loading="lazy"
                                    width="56"
                                    height="56"
                                    decoding="async"
                                    className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                                    style={{ color: 'transparent' }}
                                    src={item.img}
                                />
                                <div>
                                    <h3 className="capitalize text-base font-semibold text-[#0f0f0f]">{item.title}</h3>
                                    <p className="text-sm text-slate-500 capitalize">{item.subtitle}</p>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-slate-700">
                                <div className="mb-3 text-xs font-semibold text-slate-500">BEFORE</div>
                                <p className="bg-white p-3 rounded-md border border-slate-200 text-sm text-slate-700 italic">
                                    {item.before}
                                </p>
                            </div>
                            <div className="mt-4">
                                <div className="mb-2 text-xs font-semibold text-slate-500">AFTER</div>
                                <div className="bg-[bisque] text-black p-4 rounded-md text-sm font-medium">
                                    {item.after}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TheShift;
