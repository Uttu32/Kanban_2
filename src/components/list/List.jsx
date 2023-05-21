import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Styles from "./List.module.css";
import Task from "../Task!/Task";
import { ListData } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import { Droppable } from "react-beautiful-dnd";

const List = () => {
  const [listData, setListData] = useRecoilState(ListData);
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    const localStorageData = localStorage.getItem("Card");
    if (localStorageData) {
      setListData(JSON.parse(localStorageData));
    }
    console.log(listData);
  }, [setListData]);

  function handleDelete(Id) {
    let input = [...listData];
    input = input.filter((ele) => ele.id !== Id);
    setListData(input);
    localStorage.setItem("Card", JSON.stringify(input));
  }

  function handleChange(e, Id) {
    let input = [...listData];
    let index = input.findIndex((ele) => ele.id == Id);
    let current = { ...input[index] };
    current.listName = e.target.value;
    input[index] = current;
    setListData(input);
    localStorage.setItem("Card", JSON.stringify(input));
  }

  return (
    <div style={{ display: "flex" }}>
      {listData.map((ele, index) => {
        return (
          <Droppable key={ele.id} index={index} droppableId={ele.id}>
            {(provided) => {
              return (
                <div
                  className={Styles.mainCard}
                  key={ele.id}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
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
                        <strong>{ele.listName}</strong>
                      </p>
                    )}
                  </div>
                  <Task id={ele.id} Lname={ele.listName} task={ele.task} />
                </div>
              );
            }}
          </Droppable>
        );
      })}
    </div>
  );
};

export default List;
