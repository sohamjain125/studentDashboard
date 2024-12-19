import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./components/NotFound.js";
const App = () => {
  const [showModal, setShowModal] = useState(false);
 
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <StudentTable />
      </div>
    </div>
  );
};

export default App;
