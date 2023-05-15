import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { ListData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import Styles from "./Task.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RollerShadesClosedOutlinedIcon from "@mui/icons-material/RollerShadesClosedOutlined";
import uuid from "react-uuid";

const Task = (props) => {
  const [listData, setListData] = useRecoilState(ListData);
  const [title, setTitle] = useState("");
  const [addItem, setAddItem] = useState(false);

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

  function handleDelete(IdList){
    // let List = [...listData];
    // let index = List.findIndex((e) => e.id=== Id );
    // let Taskss = List[index].task
    // let Input =[...Taskss];
    // Input = Input.filter((e) => e.id !== IdList);
    // List[index].task = Input;
    // setListData(List)
    // console.log(listData)

    let updateList = [...listData];
    const index = updateList.findIndex((ele) => ele.id == Id);
    let currentList = { ...updateList[index] };
    const updatedTasks = currentList.task.filter(
      (ele) => ele.id != IdList
    );
    currentList.task = updatedTasks;
    updateList[index] = currentList;
    setListData(updateList);
    console.log(listData);

  }

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleAddButton() {
    setAddItem(!addItem);
  }

  return (
    <div>
      <div className={Styles.TaskBoundary}>
        {task && task.length > 0
          ? task.map((e) => (
              <div className={Styles.List}>
                <p>{e.title}</p>
                <span>
                  <DeleteIcon onClick={()=>handleDelete(e.id)}/>
                </span>
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
