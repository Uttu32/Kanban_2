import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { ListData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import Styles from "./Task.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import ListEdit from "../ListEdit/ListEdit";
import RollerShadesClosedOutlinedIcon from "@mui/icons-material/RollerShadesClosedOutlined";
import uuid from "react-uuid";

const Task = (props) => {
  const [listData, setListData] = useRecoilState(ListData);
  const [title, setTitle] = useState("");
  const [addItem, setAddItem] = useState(false);
  // const [taskId, setTaskId] = useState('');
  // const dndRef = useRef(null);
  const listIdRef = useRef(null);
  const [listId, setListId] = useState("");

  let Id = props.id;
  let listName = props.Lname;
  let task = props.task;

  function handleSubmit() {
    let TitleOfList = title.trim();
    if (TitleOfList !== "") {
      let input = [...listData];
      let newTask = {
        id: uuid(),
        title: title,
        description: "",
      };
      const temporary = {
        id: Id,
        listName: listName,
        task: [...task, newTask],
      };
      let index = listData.findIndex((ele) => ele.id === Id);
      input[index] = temporary;
      setListData(input);
      console.log(listData);
      setTitle("");
    }
  }

  // function handleDelete(IdList) {
  //   let updateList = [...listData];
  //   const index = updateList.findIndex((ele) => ele.id == Id);
  //   let currentList = { ...updateList[index] };
  //   const updatedTasks = currentList.task.filter((ele) => ele.id != IdList);
  //   currentList.task = updatedTasks;
  //   updateList[index] = currentList;
  //   setListData(updateList);
  //   console.log(listData);
  // }

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleAddButton() {
    setAddItem(!addItem);
  }

  // function handleEdit(ID) {
  //   let input = [...listData];
  //   let index = input.findIndex((ele) => ele.id === Id);
  //   let current = input[index];
  //   let taskss = { ...current };
  //   let Task = [...taskss.task];
  //   let taskIndex = Task.findIndex((ele) => ele.id === ID);
  //   console.log(Task[taskIndex]);
  // }

  //DRAGANDDROP===============================================================================================================



  function onDragStart(ev, id) {
    ev.dataTransfer.setData("id", id);
    setListId(Id);
    listIdRef.current = listId; 


    console.log( listId);
    // console.log(listData, "Pura list")
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function DropHandler(e) {
    // const currentListId = listIdRef.current;
    console.log(listIdRef.current);
    let DropId = e.dataTransfer.getData("id");
    // console.log(DropId, Id);
    let data = [...listData];
    let ListIndex = data.findIndex((ele) => ele.id === listId);
    let currentList = data[ListIndex];
    console.log(currentList);
    let Taskss = { ...currentList };
    let TaskList = [...Taskss.task];
    let taskIndex = TaskList.findIndex((ele) => ele.id === DropId);
    TaskList.splice(taskIndex, 1);
    Taskss.task = TaskList;
    data.splice(ListIndex, 1, Taskss);
    setListData(data);
    console.log(listData);
  }
  // console.log(listId);

  return (
    <div onDragOver={dragOverHandler} onDrop={(e) => DropHandler(e)}>
      <div className={Styles.TaskBoundary}>
        {task && task.length > 0
          ? task.map((val) => (
              <div
                className={Styles.List}
                key={val.id}
                draggable
                onDragStart={(e) => onDragStart(e, val.id)}
              >
                <ListEdit title={val.title} id={val.id} cardId={Id} />
              </div>
            ))
          : null}
      </div>
      {!addItem ? (
        <div className={Styles.Addbtn}>
          <div>
            <button onClick={handleAddButton} className={Styles.addButton}>
              <AddIcon
                sx={{ marginBottom: "-5px", paddingRight: "4px" }}
                fontSize="small"
                color="#B7BCC7"
              />
              Add a card
            </button>
          </div>
          <div>
            <RollerShadesClosedOutlinedIcon fontSize="small" color="disabled" />
          </div>
        </div>
      ) : (
        <div className={Styles.main}>
          <div className={Styles.Main}>
            <TextField
              id="outlined-multiline-static"
              placeholder="Enter a title for this card..."
              multiline
              value={title}
              onChange={handleChange}
              rows={2}
              sx={{ width: "100%" }}
            />
          </div>
          <div className={Styles.toggle}>
            <div className={Styles.buttonclose}>
              <button onClick={handleSubmit}>Add Card</button>
              <CloseIcon onClick={handleAddButton} />
            </div>
            <div style={{ cursor: "pointer" }}>
              <MoreHorizIcon fontSize="large" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
