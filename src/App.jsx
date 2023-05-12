import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import List from "./components/list/List";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div>
      <MainNavbar />

      <div className="Main_Background">
        
        
        <Sidebar />
        
        
        <div>
          <Navbar />
          <List />
        </div>
      </div>

      
    </div>
  );
}

export default App;
