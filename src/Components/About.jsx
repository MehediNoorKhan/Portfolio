import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2,
            when: "beforeChildren",
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const About = () => {
    return (
        <motion.div
            className="max-w-5xl mx-auto px-4 py-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-5xl font-extrabold text-emerald-600 mb-10 text-center drop-shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.05, color: '#047857' }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                How It Works
            </motion.h1>

            <motion.div className="space-y-8 text-lg text-gray-700 leading-relaxed" >
                <motion.p variants={itemVariants} className="text-center italic max-w-3xl mx-auto">
                    This platform connects food donors with people in need — reducing food waste and fighting hunger together.
                </motion.p>

                <motion.section variants={itemVariants}>
                    <h2 className="text-3xl font-semibold text-emerald-500 mb-3">🍱 Share Food</h2>
                    <p>
                        Donate your extra food by filling out the form on the <strong>Add Food</strong> page. Provide food name, quantity, pickup location, expiry date, and notes.
                    </p>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <h2 className="text-3xl font-semibold text-emerald-500 mb-3">🔍 Browse Available Food</h2>
                    <p>
                        Check the <strong>Available Foods</strong> page to see food donations ready for pickup. Each listing includes details and a request option.
                    </p>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <h2 className="text-3xl font-semibold text-emerald-500 mb-3">📨 Request Food</h2>
                    <p>
                        Request any food item you want, add notes, and submit. The item will move from available to your <strong>My Food Requests</strong> page.
                    </p>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <h2 className="text-3xl font-semibold text-emerald-500 mb-3">🛠️ Manage Foods</h2>
                    <p>
                        Manage your donations and requests from <strong>Manage Foods</strong> and <strong>My Food Requests</strong> pages. Edit or remove entries anytime.
                    </p>
                </motion.section>

                <motion.p
                    variants={itemVariants}
                    className="mt-12 font-semibold text-center text-gray-900 text-xl drop-shadow"
                    whileHover={{ scale: 1.1, color: '#065f46' }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    Join us to reduce waste and help feed those in need!
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default About;
