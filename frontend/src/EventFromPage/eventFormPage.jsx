const EveLandingPage = ({ darkMode }) => {
    const bgColor = darkMode ? 'bg-gray-800' : 'bg-gray-100';
    const textColor = darkMode ? 'text-white' : 'text-gray-900';
    const inputBgColor = darkMode ? 'bg-gray-700' : 'bg-white';
    const inputTextColor = darkMode ? 'text-white' : 'text-gray-900';
    const inputBorderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
    const buttonBgColor = darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700';

    return (
        <div className={`flex flex-col lg:flex-row items-center justify-center p-8 rounded-2xl shadow-lg max-w-6xl w-full ${bgColor} border border-purple-500 relative z-10`}>
        
        <div className="lg:w-1/2 p-4 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
            Explore the Possibilities of Digital Growth with Eve
            </h1>
            <p className={`text-lg mb-8 ${textColor}`}>
            Unleash the power of the digital world. Upgrade your business with Evening Coders, the best web development platform.
            </p>
            <h2 className={`text-2xl md:text-3xl font-semibold ${textColor}`}>
            We Are Just a Request Away
            </h2>
        </div>

        <div className={`lg:w-1/2 p-8 rounded-xl shadow-xl w-full max-w-md ${bgColor}`}>
            <form className="space-y-6">
            <div>
                <input
                type="text"
                placeholder="Name"
                className={`w-full p-3 rounded-lg border ${inputBorderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputBgColor} ${inputTextColor}`}
                />
            </div>
            <div>
                <input
                type="email"
                placeholder="Email ID"
                className={`w-full p-3 rounded-lg border ${inputBorderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputBgColor} ${inputTextColor}`}
                />
            </div>
            <div>
                <input
                type="tel"
                placeholder="Mobile Number"
                className={`w-full p-3 rounded-lg border ${inputBorderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputBgColor} ${inputTextColor}`}
                />
            </div>
            <button
                type="submit"
                className={`w-full p-3 rounded-lg font-semibold transition duration-300 ${buttonBgColor} text-white`}
            >
                SUBMIT
            </button>
            </form>
        </div>
        </div>
    );
};

export default EveLandingPage;
