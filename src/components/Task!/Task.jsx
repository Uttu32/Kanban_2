import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { ListData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import Styles from "./Task.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ListEdit from "../ListEdit/ListEdit";
import RollerShadesClosedOutlinedIcon from "@mui/icons-material/RollerShadesClosedOutlined";
import uuid from "react-uuid";

const Task = (props) => {
  const [listData, setListData] = useRecoilState(ListData);
  const [title, setTitle] = useState("");
  const [addItem, setAddItem] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

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

  return (
    <div>
      <div className={Styles.TaskBoundary}>
        {task && task.length > 0
          ? task.map((e) => (
              <div className={Styles.List} key={e.id}>
                <ListEdit title={e.title} id={e.id} cardId={Id}/>
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
