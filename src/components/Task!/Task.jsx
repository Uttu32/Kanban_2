import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import { ListData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import Styles from "./Task.module.css";
import uuid from "react-uuid";

const Task = (props) => {
  const [isColumn, setIsColumn] = useState(false);
  const [listData, setListData] = useRecoilState(ListData);
  const [title, setTitle] = useState("");

  let Id = props.id;
  let listName = props.Lname;



  function handleSubmit(e) {
    e.preventDefault();
    let input = [...listData];
    const temporary = {
      id: Id,
      listName: listName,
      task: [{ id: uuid(), title: title }]
    }
    let index = listData.findIndex((ele) => ele.id === Id);
    input[index] = temporary;
    setListData(input)
    console.log(listData);
    setIsColumn(true);
  }

  return (
    <div>
      {
        isColumn == false ?
          <div >
            <form className={Styles.Main} onSubmit={handleSubmit}>
              <TextField id="outlined-multiline-static"
                placeholder="Enter a title for this card..."
                multiline
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={2} />
              <button type="submit">Add</button>
            </form>
          </div> :
          <div className={Styles.Toggled} >
            <h4>{title}</h4>
            <EditIcon onClick={() => setIsColumn(false)} />
          </div>
      }
    </div>
  );
};

export default Task;
