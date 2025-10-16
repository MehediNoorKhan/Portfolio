import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-scroll";

const Contact = () => {
    return (
        <section
            id="contacts"
            className="py-16 md:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50"
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                {/* Title */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 bg-clip-text text-transparent leading-tight pb-1">
                        Let’s Work Together
                    </h2>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg">
                        Have a project in mind? Let’s discuss how I can help bring your ideas to life.
                    </p>
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {/* Left: Contact Info */}
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                            Let's talk about your project
                        </h3>
                        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                            I'm always interested in hearing about new projects and opportunities. Reach out anytime!
                        </p>

                        <div className="space-y-4">
                            {/* Email */}
                            <div className="flex items-center bg-white rounded-xl shadow-md p-3 sm:p-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 text-white">
                                    <FaEnvelope size={20} />
                                </div>
                                <div className="ml-3 sm:ml-4">
                                    <p className="text-gray-700 font-semibold text-sm sm:text-base">Email</p>
                                    <p className="text-gray-500 text-sm sm:text-base">mehedinoorkhan16@gmail.com</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center bg-white rounded-xl shadow-md p-3 sm:p-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-pink-400 text-white">
                                    <FaPhoneAlt size={20} />
                                </div>
                                <div className="ml-3 sm:ml-4">
                                    <p className="text-gray-700 font-semibold text-sm sm:text-base">Phone</p>
                                    <p className="text-gray-500 text-sm sm:text-base">01789879173</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center bg-white rounded-xl shadow-md p-3 sm:p-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-400 text-white">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div className="ml-3 sm:ml-4">
                                    <p className="text-gray-700 font-semibold text-sm sm:text-base">Location</p>
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        Bashundhara R/A, Dhaka, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="mt-6">
                            <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
                                Follow me on social media
                            </p>
                            <div className="flex space-x-3">
                                <a
                                    href="https://github.com/MehediNoorKhan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-black text-white hover:bg-gray-800 transform hover:scale-110 transition-all duration-300"
                                >
                                    <FaGithub size={18} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/mehedinoorkhan16/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-blue-700 text-white hover:bg-blue-800 transform hover:scale-110 transition-all duration-300"
                                >
                                    <FaLinkedin size={18} />
                                </a>
                                <a
                                    href="https://www.facebook.com/mehedinoorkhan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
                                >
                                    <FaFacebook size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                        <form className="flex flex-col h-full justify-between space-y-4 sm:space-y-5">
                            <div className="space-y-4 sm:space-y-5">
                                {/* Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 sm:py-3 w-full focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm sm:text-base"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 sm:py-3 w-full focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm sm:text-base"
                                    />
                                </div>

                                {/* Subject */}
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 sm:py-3 w-full focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm sm:text-base"
                                />

                                {/* Message */}
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows={4}
                                    className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 sm:py-3 w-full focus:outline-none focus:border-blue-500 placeholder-gray-400 resize-none text-sm sm:text-base"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 font-semibold text-white rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
