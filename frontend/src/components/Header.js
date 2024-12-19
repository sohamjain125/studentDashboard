import React from "react";

const Header = ({ onSearch }) => {
  // Handles input changes and triggers the onSearch callback
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-96">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
          ></path>
        </svg>
        <input
          type="text"
          placeholder="Search your course"
          className="bg-gray-100 focus:outline-none ml-2 w-full"
          onChange={handleSearch}
        />
      </div>

      {/* Icons & Profile */}
      <div className="flex items-center gap-9">
        {/* Notification Icons */}
        <div className="flex gap-10">
          <img className="w-6 h-6" src="../help (1).png" alt="Help" />
          <img className="w-6 h-6" src="../message.png" alt="Messages" />
          <img className="w-6 h-6" src="../settings (1).png" alt="Settings" />
          <img
            className="w-6 h-6"
            src="../Notification.png"
            alt="Notifications"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <img
            src="../Avatar Image.png"
            alt="User"
            className="w-10 h-10 rounded-lg"
          />
          <span className="font-semibold text-gray-700">Adeline H. Dancy</span>
        </div>
       
      </div>
    </div>
    
  );
};

export default Header;
