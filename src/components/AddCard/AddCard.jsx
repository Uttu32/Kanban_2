import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Styles from "./AddCard.module.css";
import { ListData } from "../../Recoil/Atom/atom";
import CloseIcon from "@mui/icons-material/Close";
import uuid from "react-uuid";
import { useRecoilState } from "recoil";

const AddCard = () => {
  const [listData, setListData] = useRecoilState(ListData);
  const [listName, setListName] = useState("");
  const [isBtn, setIsBtn] = useState(true);

  function handleClick() {
    setIsBtn(!isBtn);
  }

  function handleAddList() {
    let Lname = listName.trim();
    if (Lname !== "") {
      let Id = uuid();
      const temporary = {
        id: Id,
        listName: listName,
        task: [],
      };
      setListName("");
      setListData([...listData, temporary]);
    }
  }

  return (
    <div className={Styles.Main}>
      {isBtn ? (
        <div>
          <button onClick={handleClick} className={Styles.btn}>
            <AddOutlinedIcon /> Add another List{" "}
          </button>
        </div>
      ) : (
        <div className={Styles.Toggled}>
          <input
          value={listName}
            onChange={(e) => setListName(e.target.value)}
            type="text"
            placeholder="Enter List name "
          />
          <div className={Styles.buttonclose}>
            <button onClick={handleAddList}>Add List</button>
            <CloseIcon onClick={handleClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCard;
