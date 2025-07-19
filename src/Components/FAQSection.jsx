import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I host a food drive?",
    answer:
      "Hosting a food drive involves choosing a location, promoting it, setting clear donation guidelines, and partnering with a local food bank for pickup or delivery.",
  },
  {
    question: "What should I donate to a food bank?",
    answer:
      "Shelf-stable items like canned vegetables, pasta, rice, peanut butter, and baby food are excellent donations. Check expiry dates before donating.",
  },
  {
    question: "What should I not donate to a food bank?",
    answer:
      "Avoid donating expired items, perishable goods, open packages, and homemade food unless explicitly requested by the food bank.",
  },
  {
    question: "Should I donate cash or cans?",
    answer:
      "Both are helpful, but cash allows food banks to buy exactly what they need and cover operational costs. It can often be more efficient.",
  },
  {
    question: "Can I donate food to Feeding America?",
    answer:
      "Yes, Feeding America accepts both food and monetary donations. They work with local food banks to distribute your contributions effectively.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-orange-50 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left div */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-orange-700 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Food banks, food pantries, and soup kitchens accept food donations.
            But they have their own rules for how they accept donations and what
            they accept. Below are some common ways to donate:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              Check local food banks’ accepted items list before donating.
            </li>
            <li>Organize community drives to gather support efficiently.</li>
            <li>Ensure all items are unopened and within expiration date.</li>
            <li>Cash donations often help cover food and operational needs.</li>
            <li>Volunteer to help sort or distribute food donations.</li>
          </ul>
        </motion.div>

        {/* Right div - Accordion */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-xl shadow-md divide-y">
            {faqs.map((item, index) => (
              <div key={index} className="p-5">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full font-semibold text-left text-gray-800 text-lg"
                >
                  {item.question}
                  <FaChevronDown
                    className={`ml-2 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-600 mt-3 text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
