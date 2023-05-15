import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import List from "./components/list/List";
import Sidebar from "./components/sidebar/Sidebar";
import AddCard from "./components/AddCard/AddCard";
// import Task from "./components/Task!/Task";

function App() {
  return (
    // <div>
    //   <Task />
    // </div>
    <div>
      <MainNavbar />

      <div className="Main_Background">
        
        
        <Sidebar />
        
        
        <div className="mainContent">
          <Navbar />
          <div className="inner">
            <List />
            <AddCard />
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default App;
