import "./App.css";
import React,{useEffect} from "react";
import Navbar from "./components/Navbar/Navbar";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import List from "./components/list/List";
import Sidebar from "./components/sidebar/Sidebar";
import AddCard from "./components/AddCard/AddCard";
import { Image } from "./Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import { Bcg_Image } from "./Data/Data";

function App() {

  
  const [image, setImage] = useRecoilState(Image);

  useEffect(() => {
    const localStorageData = localStorage.getItem('Image')
    if (localStorageData) {
      setImage(JSON.parse(localStorageData))
    }
  }, [setImage]);

  console.log(image);
  return (
    // <div>
    //   <Task />
    // </div>
    <div>
      {/* Roting added */}
      <MainNavbar />

      <div className="Main_Background" style={{backgroundImage: `url(${Bcg_Image[image]})` }}>


        {/* <Sidebar /> */}


        <div className="mainContent">
          <Navbar />
          <div className="inner">
            <List />
            <AddCard />
          </div>
        </div>
      </div>

      {/* <ItemBox /> */}
    </div>
  );
}

export default App;
