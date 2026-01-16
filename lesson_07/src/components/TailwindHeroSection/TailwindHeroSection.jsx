import React from 'react';

const TailwindHeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-5">
          Welcome to Tailwind CSS!
        </h1>
        <p className="text-xl text-gray-800 mb-8 leading-relaxed">
          Rapid UI development with utility classes.
        </p>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out"
          onClick={() => alert('Tailwind button clicked!')}
        >
          Discover More
        </button>
      </div>
    </div>
  );
};

export default TailwindHeroSection;