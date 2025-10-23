import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects } from "../data/projects.js";
import { motion } from "framer-motion";

const Projects = () => {
    // Single unified blue gradient
    const blueGradient = ["#D6E4FF", "#85A5FF", "#3366FF"];

    return (
        <section id="projects" className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl mb-10 text-center pb-2 font-bold text-blue-500">
                    Projects
                </h2>
                <p className="text-gray-600 text-center mb-12">
                    Some of my recent projects are displayed below.
                </p>

                {/* Project Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(
                        ({ id, title, image, link, github, technologies, description }) => (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                whileHover={{ scale: 1.05 }}
                                className="relative flex flex-col h-full sm:h-[480px] bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                            >
                                {/* Project Image */}
                                <figure className="h-40 overflow-hidden">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </figure>

                                {/* Card Body */}
                                <div className="flex flex-col flex-1 p-4 sm:p-6 text-left relative">
                                    {/* Tech Badges */}
                                    {/* Tech Badges */}
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {technologies.map((tech, index) => (
                                            <motion.span
                                                key={index}
                                                className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full text-white cursor-pointer bg-[#2a52be]"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>


                                    {/* Title */}
                                    <h3 className="text-lg pl-1 sm:text-xl font-bold mb-2 text-gray-800">
                                        {title}
                                    </h3>

                                    {/* Description */}
                                    <div className="relative flex-1 group">
                                        <p
                                            className="text-gray-500 overflow-hidden text-ellipsis text-sm sm:text-base"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {description}
                                        </p>
                                    </div>

                                    {/* Horizontal line */}
                                    <hr className="my-3 border-gray-300" />

                                    {/* Bottom Links */}
                                    <div className="flex justify-between items-center mt-auto">
                                        {/* Visit Site */}
                                        <motion.a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 font-semibold px-3 py-1 rounded transition-colors duration-300 text-blue-700 hover:text-white hover:bg-blue-500"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Visit Site <FaExternalLinkAlt className="text-blue-700 group-hover:text-white" />
                                        </motion.a>

                                        {/* GitHub */}
                                        <motion.a
                                            href={github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded transition-colors duration-300 text-gray-800 hover:text-white hover:bg-gray-900"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <FaGithub />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
