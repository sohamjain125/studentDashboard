import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      {/* Logo */}
      <img src="../Vector.png" className="p-6 text-xl font-bold"></img>

      {/* Navigation Links */}
      <ul className="mt-6">
        <button className="px-6 py-3 w-full hover:bg-gray-200">
          <img src="../Dashboard.png"></img>
        </button>
        <button className="px-6 py-3 w-full hover:bg-gray-200">
          <img className="opacity-55" src="../Students.png"></img>
        </button>
        <button className="px-6 py-3 w-full hover:bg-gray-200">
          <img src="../Chapter.png"></img>
        </button>
        <button className="px-6 py-3 w-full hover:bg-gray-200">
          <img src="../Help.png"></img>
        </button>
        <button className="px-6 py-3 w-full hover:bg-gray-200">
          <img src="../Reports.png"></img>
        </button>
        <button className="px-6 py-3 w-full hover:bg-gray-200">
          <img src="../Settings.png"></img>
        </button>

        {/* <li className="px-6 py-3 font-semibold bg-gray-200">Students</li>
        <li className="px-6 py-3 hover:bg-gray-200">Chapter</li>
        <li className="px-6 py-3 hover:bg-gray-200">Help</li>
        <li className="px-6 py-3 hover:bg-gray-200">Reports</li>
        <li className="px-6 py-3 hover:bg-gray-200">Settings</li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
