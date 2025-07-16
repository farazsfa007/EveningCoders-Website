import React from 'react';

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen font-sans">
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Hello, React & Tailwind!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            A simple and clean component to get you started.
          </p>
        </div>
        
        <div className="text-gray-700 dark:text-gray-200">
          <p>
            This component is built using <span className="font-semibold text-blue-500">React</span> for the structure and <span className="font-semibold text-teal-500">Tailwind CSS</span> for the styling. You can easily customize the classes to change the look and feel.
          </p>
        </div>

        <div className="flex justify-center pt-4">
            <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300">
                Get Started
            </button>
        </div>

      </div>
    </div>
  );
}

export default App