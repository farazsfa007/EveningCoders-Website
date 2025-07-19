import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    title: "Basic",
    price: "$599.99",
    description: "Simple, attractive, and personalized recommendations.",
    features: [
      "A standard UI/UX",
      "Search Engine Optimisation friendly",
      "Random bonus giveaways with lucky draw",
    ],
    color: "text-yellow-400",
    bgColor: "bg-yellow-400",
  },
  {
    title: "Premium",
    price: "$1199.99",
    description: "Advanced features, customization, and priority assistance.",
    features: [
      "An advanced UI/UX with complex features",
      "Personalized customization based on preferences",
      "Priority support to solve issues quickly",
    ],
    color: "text-red-400",
    bgColor: "bg-red-400",
    isPopular: true,
  },
  {
    title: "Rental",
    price: "$59.99/m",
    description: "Attractive templates, growth assistance, and dedicated support.",
    features: [
      "Pre-designed unique templates",
      "Pay as you use: A flexible scheme",
      "Quit or switch between memberships",
    ],
    color: "text-purple-400",
    bgColor: "bg-purple-400",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#0d0d12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
            Getting Started with Evening Coders
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">
            Digital Presence in Your Budget
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl p-8 bg-[#13131a] border border-gray-700 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-purple-500 ${
                plan.isPopular ? "lg:scale-110 border-purple-500" : ""
              }`}
            >

              {plan.isPopular && (
                <div className="absolute top-0 right-8 -mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <h2 className={`text-2xl font-semibold mb-2 ${plan.color}`}>
                {plan.title}
              </h2>
              <p className="text-sm text-gray-400 mb-6 h-12">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                {plan.title === "Rental" && (
                  <span className="text-gray-400 text-lg ml-1">/month</span>
                )}
              </div>

              <button className="w-full rounded-lg py-3 text-sm font-semibold tracking-wider uppercase mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 transition-opacity">
                Get Started
              </button>

              <ul className="space-y-4 text-sm text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className={`${plan.color} mt-1 flex-shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;