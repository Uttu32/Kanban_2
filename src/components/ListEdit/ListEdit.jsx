import React, { useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListData } from "../../Recoil/Atom/atom";
import Styles from "./ListEdit.module.css";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


const ListEdit = (props) => {
  let Title = props.title;
  let ListId = props.id;
  let CardId = props.cardId;

  const [listData, setListData] = useRecoilState(ListData);
  const [isInput, setIsInput] = useState(false);
  const [title, setTitle] = useState(Title);
  const navigate = useNavigate();

  function handleDelete() {
    let updateList = [...listData];
    const index = updateList.findIndex((ele) => ele.id == CardId);
    let currentList = { ...updateList[index] };
    const updatedTasks = currentList.task.filter((ele) => ele.id != ListId);
    currentList.task = updatedTasks;
    updateList[index] = currentList;
    setListData(updateList);
    console.log(listData);
  }

  function handleEdit(e) {
    e.preventDefault();
    let input = [...listData];
    let index = input.findIndex((ele) => ele.id === CardId);
    let current = input[index];    
    let taskss = { ...current };
    let Task = [...taskss.task];    
    let taskIndex = Task.findIndex((ele) => ele.id === ListId);    
    let EditTitle = {...Task[taskIndex]}
    EditTitle.title = title;
    Task.splice(taskIndex,1, EditTitle);
    taskss.task = Task;
    console.log(taskss)
    input.splice(index, 1,taskss )
    setListData(input);
    
    setIsInput(!isInput);    
  }

  function handleNavigate(){
    navigate(`/${CardId}/${ListId}/edit`)
  }

  return (
    <div className={Styles.Main}>
      <div>
        {isInput ? (
          <form  onSubmit={(e)=>handleEdit(e)}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        ) : (
          <p onClick={ handleNavigate } >{Title}</p>
        )}
      </div>
      <span>
        <EditTwoToneIcon onClick={()=>setIsInput(!isInput)} />
        <DeleteIcon onClick={() => handleDelete()} />
      </span>
    </div>
  );
};

export default ListEdit;
