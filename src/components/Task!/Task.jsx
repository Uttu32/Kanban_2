import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { ListData, CardData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import Styles from "./Task.module.css";
import uuid from "react-uuid";

const Task = (props) => {
  const [listData, setListData] = useRecoilState(ListData);
  const [title, setTitle] = useState("");
  const [cardData, setCardData] = useRecoilState(CardData);

  let Id = props.id;
  let listName = props.Lname;
  let task = props.task;

  function handleSubmit(e) {
    e.preventDefault();
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
  }

  // function handleDleteList(IdCard,IdList){
  //   let input = [...listData];
  //   // input.map((ele)=>)
  //   setListData(input)
  // }

  return (
    <div>
      {/* {listData.map((ele) => ele.task.map((e) => <div className={Styles.List}>
        <p>{e.title}</p>
        <button>Delete</button>
      </div>))} */}
      {(task && task.length > 0) ?

      task.map((e) => <div className={Styles.List}>
        <p>{e.title}</p>
        <button>Delete</button>
      </div>)
      : null
      }
      <div>
        <form className={Styles.Main} onSubmit={handleSubmit}>
          <TextField          
            id="outlined-multiline-static"
            placeholder="Enter a title for this card..."
            multiline
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2 }
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Task;
