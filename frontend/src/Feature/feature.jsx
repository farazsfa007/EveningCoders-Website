import React from "react";
import { FaPaintBrush, FaLightbulb, FaUsers, FaSitemap, FaHandHoldingUsd, FaProjectDiagram } from "react-icons/fa";

const features = [
    {
        title: "Unique Designs",
        description:
        "Our team prepares eye-catching and interactive designs to make our client’s business grow high by attracting more customers and serving them better.",
        icon: <FaPaintBrush className="text-4xl text-blue-600 group-hover:text-blue-700 transition duration-300" />,
    },
    {
        title: "Innovative Ideas",
        description:
        "Our consultants help and suggest trending ideas during the second phase of development to improve your business strategy and help you grow exponentially.",
        icon: <FaLightbulb className="text-4xl text-yellow-500 group-hover:text-yellow-600 transition duration-300" />,
    },
    {
        title: "Skilled Team",
        description:
        "We prefer passion over professionalism, one of the pillars of our business model. Our team works on the project as its own, making the product best of its kind.",
        icon: <FaUsers className="text-4xl text-green-600 group-hover:text-green-700 transition duration-300" />,
    },
    {
        title: "Well Designed Workflow",
        description:
        "We have designed an easy and simple workflow where you will get your project report at each step stating the progress of your application and our timeline.",
        icon: <FaSitemap className="text-4xl text-purple-600 group-hover:text-purple-700 transition duration-300" />,
    },
    {
        title: "Rental Scheme for Startups",
        description:
        "We offer cost-effective monthly scheme to hire an app as well as developer. Clients can use this opportunity to test their growth and our services.",
        icon: <FaHandHoldingUsd className="text-4xl text-pink-600 group-hover:text-pink-700 transition duration-300" />,
    },
    {
        title: "Project Dedicated Resources",
        description:
        "We offer dedicated resources according to the project. We have passionate, skilled, and experienced developers as well as designers to fulfill your needs.",
        icon: <FaProjectDiagram className="text-4xl text-indigo-600 group-hover:text-indigo-700 transition duration-300" />,
    },
];

function Feature() {
    return (
        
        <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-800 py-16 md:py-24 px-4 sm:px-6 lg:px-20 font-inter">
            <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight">
                    Get Your Dream App in Just One Click
                </h2>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                    Explore our key features designed to accelerate your business success with innovative solutions and dedicated support.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {features.map((feature, index) => (

                    <div
                        key={index}
                        className="group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out
                                    transform hover:-translate-y-2 hover:scale-105 border border-gray-200 dark:border-gray-700
                                    flex flex-col items-center text-center"
                    >

                        <div className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 transition duration-300">
                            {feature.icon}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {feature.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-base mb-6 flex-grow">
                            {feature.description}
                        </p>

                        <a
                            href="#"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300
                            font-semibold text-base transition-colors duration-300
                            group-hover:translate-x-1"
                        >
                            Explore More
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Feature;
