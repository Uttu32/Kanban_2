import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import List from "./components/list/List";
import Sidebar from "./components/sidebar/Sidebar";
import AddCard from "./components/AddCard/AddCard";
import { Image, ListData } from "./Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import { Bcg_Image } from "./Data/Data";
import { DragDropContext } from "react-beautiful-dnd";


function App() {
  const [image, setImage] = useRecoilState(Image);
  const [listData, setListData] = useRecoilState(ListData);

  useEffect(() => {
    const localStorageData = localStorage.getItem("Image");
    if (localStorageData) {
      setImage(JSON.parse(localStorageData));
    }
  }, [setImage]);

  function handleOnDragEnd(result){
    console.log(result);
    const {source, destination} = result;
    if(!destination){
      return;
    }
    if(source.droppableId !== destination.droppableId){
      const [sourceCard] = listData.filter((ele)=> ele.id === source.droppableId);
      const [destinationCard] = listData.filter((ele)=> ele.id === destination.droppableId);
      const sourceList =  [...sourceCard.task];
      const destinationList = [...destinationCard.task];
      const [removedList] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, removedList);
      let UpdatedList = listData.map((ele) => {
        if(ele.id === source.droppableId){
          return {...ele, task:sourceList}
        }
        else if(ele.id === destination.droppableId){
          return {...ele, task: destinationList};
        }
        return ele;
      })
      setListData(UpdatedList);
      localStorage.setItem('Card', JSON.stringify(UpdatedList))
    }
    else{
      const [sourceCard] = listData.filter((ele)=> ele.id === source.droppableId);
      const sourceList =  [...sourceCard.task];
      const [removedList] = sourceList.splice(source.index, 1);
      sourceList.splice(destination.index, 0 , removedList);
      const UpdatedList = listData.map((ele)=>{
        if(ele.id === source.droppableId){
          return {...ele, task: sourceList};
        }
        return ele;
      })
      setListData(UpdatedList);
      localStorage.setItem('Card', JSON.stringify(UpdatedList))
    }    
  }



  return (
    <div style={{height:"100vh", position:'relative'}}>
      {/* Roting added */}
      {/* <MainNavbar /> */}
      <Navbar />

      <div
        className="Main_Background"
        style={{ backgroundImage: `url(${Bcg_Image[image]})` }}
      >
        {/* <Sidebar /> */}

        <div className="mainContent">
          
          <DragDropContext onDragEnd={(result)=> handleOnDragEnd(result)}>
            <div className="inner">
              <List />
              <AddCard />
            </div>
          </DragDropContext>
        </div>
      </div>

      {/* <ItemBox /> */}
    </div>
  );
}

export default App;
