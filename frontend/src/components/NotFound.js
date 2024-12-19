import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mt-2">The page you are looking for does not exist.</p>
            <p className="text-lg text-gray-600 mt-2">In Progress ...</p>
        </div>
    );
};

export default NotFound;