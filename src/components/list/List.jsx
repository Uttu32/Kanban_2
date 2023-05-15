import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RollerShadesClosedOutlinedIcon from "@mui/icons-material/RollerShadesClosedOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Styles from "./List.module.css";
import Task from "../Task!/Task";
import { ListData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";

const List = () => {
  const [addItem, setAddItem] = useState(false);
  const [listData, setListData] = useRecoilState(ListData);
  const [inputVisible, setInputVisible] = useState(false);

  function handleAddButton() {
    setAddItem(!addItem);
  }

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
          <div className={Styles.mainCard}>
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
            {console.log(ele)}
            <Task id={ele.id} Lname={ele.listName} task={ele.task}/>
            {addItem ? (
              <div className={Styles.main}>
                
                <div className={Styles.toggle}>
                  <div className={Styles.buttonclose}>
                    <button>Add Card</button>
                    <CloseIcon onClick={handleAddButton} />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <MoreHorizIcon fontSize="large" />
                  </div>
                </div>
              </div>
            ) : (
              <div className={Styles.Addbtn}>
                <div >
                  <button
                    onClick={handleAddButton}
                    className={Styles.addButton}
                  >
                    <AddIcon
                      sx={{ marginBottom: "-5px", paddingRight: "4px" }}
                      fontSize="small"
                      color="#B7BCC7"
                    />
                    Add a card
                  </button>
                </div>
                <div>
                  <RollerShadesClosedOutlinedIcon
                    fontSize="small"
                    color="disabled"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
