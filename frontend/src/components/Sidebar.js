import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <img src="../Vector.png" className="p-6 text-xl font-bold"></img>

      <ul className="mt-6">
        <Link to={"/dashboard"}>
          <button className="px-6 py-3 w-full hover:bg-gray-200">
            <img src="../Dashboard.png"></img>
          </button>
        </Link>
        <Link to={"/"}>
          <button className="px-6 py-3 w-full hover:bg-gray-200">
            <img className="" src="../Students.png"></img>
          </button>
        </Link>
        <Link to={"/chapter"}>
          <button className="px-6 py-3 w-full hover:bg-gray-200">
            <img src="../Chapter.png"></img>
          </button>
        </Link>
        <Link to={"/help"}>
          <button className="px-6 py-3 w-full hover:bg-gray-200">
            <img src="../Help.png"></img>
          </button>
        </Link>

        <Link to={"/reports"}>
          <button className="px-6 py-3 w-full hover:bg-gray-200">
            <img src="../Reports.png"></img>
          </button>
        </Link>

        <Link to={"/settings"}> 
          <button className="px-6 py-3 w-full hover:bg-gray-200">
            <img src="../Settings.png"></img>
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
