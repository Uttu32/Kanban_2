import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Styles from "./List.module.css";
import Task from "../Task!/Task";
import { ListData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";

const List = () => {
  const [addItem, setAddItem] = useState(false);
  const [listData, setListData] = useRecoilState(ListData);
  const [inputVisible, setInputVisible] = useState(false);

  function handleDelete(Id) {
    let input = [...listData];
    input = input.filter((ele) => ele.id !== Id);
    setListData(input);
    console.log(listData)
  }

  function handleChange(e, Id) {
    let input = [...listData];
    let index = input.findIndex((ele) => ele.id == Id);
    let current = { ...input[index] };
    current.listName = e.target.value;
    input[index] = current;
    setListData(input);
  }

  return (
    <div style={{ display: "flex" }}>
      {listData.map((ele) => {
        return (
          <div className={Styles.mainCard} key={ele.id}>
            <div className={Styles.Upper}>
              {inputVisible ? (
                <form onSubmit={() => setInputVisible(false)}>
                  <input
                    className={Styles.ListName}
                    type="text"
                    placeholder={ele.listName}
                    onChange={(e) => handleChange(e, ele.id)}
                  />
                  <DeleteIcon
                    onClick={() => handleDelete(ele.id)}
                    fontSize="small"
                    
                  />
                </form>
              ) : (
                <p
                  style={{ width: "100%" }}
                  onClick={() => setInputVisible(true)}
                >
                  {ele.listName}
                </p>
              )}
            </div>
            <Task id={ele.id} Lname={ele.listName} task={ele.task}/>
          </div>
        );
      })}
    </div>
  );
};

export default List;
