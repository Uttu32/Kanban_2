import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RollerShadesClosedOutlinedIcon from "@mui/icons-material/RollerShadesClosedOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "./List.module.css";
import Task from "../Task/Task";

const List = () => {
  const [listName, setListName] = useState("To do");
  const [addItem, setAddItem] = useState(false);

  function handleAddButton() {
    setAddItem(!addItem);
  }

  return (
    <div className={Styles.mainCard}>
      <div className={Styles.Upper}>
        <div>
          <input
            className={Styles.ListName}
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </div>
        <div>
          <MoreHorizIcon fontSize="small" color="disabled" />
        </div>
      </div>

      {addItem ? (
        <div className={Styles.main}>
          <Task />
          <div className={Styles.toggle}>
            <div className={Styles.buttonclose}>
              <button>Add Card</button>
              <CloseIcon onClick={handleAddButton} />
            </div>
            <div style={{ cursor: "pointer" }}>
              <MoreHorizIcon fontSize="large" color="disabled" />
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default List;
