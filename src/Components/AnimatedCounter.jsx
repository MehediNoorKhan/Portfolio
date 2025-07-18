import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CounterSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const counters = [
        { label: "Total Donors", value: 1200 },
        { label: "Food Requests", value: 3450 },
        { label: "Happy Recipients", value: 980 },
        { label: "Active Volunteers", value: 150 },
    ];

    return (
        <section
            ref={ref}
            className="bg-gradient-to-r from-green-100 to-green-50 py-16 text-center"
        >
            <h2 className="text-4xl font-bold text-green-800 mb-12">
                Our Community Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {counters.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                    >
                        <h3 className="text-5xl font-bold text-green-600 mb-2">
                            {inView ? (
                                <CountUp
                                    end={item.value}
                                    duration={4} 
                                    delay={0.2}
                                />
                            ) : (
                                "0"
                            )}
                        </h3>
                        <p className="text-lg font-medium text-gray-700">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CounterSection;
