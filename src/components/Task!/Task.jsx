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
import { Draggable } from "react-beautiful-dnd";

const Task = (props) => {
  const [listData, setListData] = useRecoilState(ListData);
  const [title, setTitle] = useState("");
  const [addItem, setAddItem] = useState(false);
  // const [listId, setListId] = useState("");

  let Id = props.id;
  let listName = props.Lname;
  let task = props.task;

  function handleSubmit() {
    let TitleOfList = title.trim();
    if (TitleOfList !== "") {
      let input = [...listData];
      let createdOn = new Date();
      let month = createdOn.getMonth() + 1;
      let date = createdOn.getDate();
      let year = createdOn.getFullYear();
      let hour = createdOn.getHours();
      let minute = createdOn.getMinutes();
      let second = createdOn.getSeconds();
      let fullDate =
        date +
        "-" +
        month +
        "-" +
        year +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;

      let newTask = {
        id: uuid(),
        title: title,
        description: "",
        time: fullDate,
        comments: [],
      };

      const temporary = {
        id: Id,
        listName: listName,
        task: [...task, newTask],
      };
      let index = listData.findIndex((ele) => ele.id === Id);
      input[index] = temporary;

      setListData(input);

      localStorage.setItem("Card", JSON.stringify(input));

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
    setTitle(e.target.eleue);
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

  // function onDragStart(e, id) {
  //   e.dataTransfer.setData("text/plain", id);
  //   e.dataTransfer.setData("text/listId", Id);
  //   // console.log(listId)
  // }

  // function dragOverHandler(e) {
  //   e.preventDefault();
  // }

  // function DropHandler(e) {
  //   let DropId = e.dataTransfer.getData("text/plain");
  //   const originalListId = e.dataTransfer.getData("text/listId");
  //   let input = [...listData];
  //   let index = input.findIndex((ele) => ele.id === Id);
  //   let current = { ...input[index] };
  //   let Task = [...current.task];

  //   console.log(listData);

  //   //dragged Card
  //   let Index2 = input.findIndex((ele) => ele.id === originalListId);
  //   let current2 = { ...input[Index2] };
  //   let Task2 = [...current2.task];
  //   let TaskIndex2 = Task2.findIndex((ele) => ele.id === DropId);
  //   Task.push(Task2[TaskIndex2]);
  //   Task2.splice(TaskIndex2, 1);

  //   current.task = Task;
  //   input[index] = current;

  //   current2.task = Task2;
  //   input[Index2] = current2;

  //   setListData(input);
  //   localStorage.setItem('Card', JSON.stringify(input));

  // }

  return (
    <div>
      <div className={Styles.TaskBoundary}>
        {task && task.length > 0
          ? task.map((ele, index) => (
              <Draggable key={ele.id} draggableId={ele.id} index={index}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={Styles.List}
                      key={ele.id}
                    >
                      <ListEdit title={ele.title} id={ele.id} cardId={Id} />
                    </div>
                  );
                }}
              </Draggable>
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
