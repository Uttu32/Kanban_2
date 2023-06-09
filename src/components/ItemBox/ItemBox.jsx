import React, { useState, useEffect } from "react";
import "./ItemBox.css";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { ListData } from "../../Recoil/Atom/atom";
import uuid from "react-uuid";

export default function ItemBox() {
  const [showDescription, setShowDescription] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [Description, setDescription] = useState("");
  const [showComment, setShowComment] = useState(false);

  const [currentCardTitle, setCurrentCardTitle] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [comment, setComment] = useState('')

  const navigate = useNavigate();
  const { Cid, Lid } = useParams();

  const [listData, setListData] = useRecoilState(ListData);

  useEffect(() => {
    let input = [...listData];
    // console.log(input, "global state");
    let index = input.findIndex((ele) => ele.id === Cid);

    let currentCard = { ...input[index] };
    setCurrentCardTitle(currentCard.listName);

    let taskss = { ...currentCard };
    let Task = [...taskss.task];
    // console.log(Task);

    let taskindex = Task.findIndex((ele) => ele.id === Lid);
    // console.log(Task[taskindex]);

    let currentTaskss = Task[taskindex];

    setCurrentTask(currentTaskss);
    setDescription(currentTask.description);
    console.log(currentTaskss);
  }, [showDescription]);

  function handleDescription() {
    let input = [...listData];
    // console.log(input, "global state");
    let index = input.findIndex((ele) => ele.id === Cid);
    let currentCard = { ...input[index] };
    let taskss = { ...currentCard };
    let Task = [...taskss.task];
    console.log(taskss);
    console.log(Task);
    let taskindex = Task.findIndex((ele) => ele.id === Lid);
    let currentTaskss = Task[taskindex];
    let particularTask = { ...currentTaskss };
    particularTask.description = Description;
    Task.splice(taskindex, 1, particularTask);
    console.log(Task);
    taskss.task = Task;
    console.log(taskss);
    input.splice(index, 1, taskss);
    setListData(input);
    localStorage.setItem("Card",JSON.stringify(input))
    console.log(listData);
    // console.log(input, "global");
    // setListData(input);
    setShowDescription(false);
  }
  
  function handleCommentSubmit() {
        setShowComment(false)
        setComment('')
    }

    function handleCommentDelete(ind){
        let input = [...listData];
        let index = input.findIndex((ele) => ele.id === Cid);
        let currentCard = { ...input[index] };
        let taskss = { ...currentCard };
        let Task = [...taskss.task];
        let taskindex = Task.findIndex((ele) => ele.id === Lid);
        let currentTaskss = Task[taskindex];
        let particularTask = { ...currentTaskss };
        let commentsArr = [...particularTask.comments]
        // console.log(comments, ind)
        // if(ind < 1){
        //     particularTask.comments = []
        // }
        // else{
            commentsArr.splice(ind, 1)
            particularTask.comments = commentsArr
        // }
        Task.splice(taskindex, 1, particularTask);
        taskss.task = Task;
        input.splice(index, 1, taskss);
        setListData(input);
        console.log(input)
    }

  return (
    <div className="Ibox_mainBackground">
      <div className="Ibox_container">
        <section className="Ibox_titleSection">
          <div>
            <div className="Ibox_iconPart">
              <CreditCardIcon />
            </div>
            <div className="Ibox_contentPart">
              <h3>{currentTask.title}</h3>
              <p>in List {currentCardTitle}</p>
              <br />
              <h5>Notifications</h5>
              <button>
                <RemoveRedEyeIcon fontSize="small" /> &nbsp; Watch
              </button>
            </div>
          </div>
          <CloseIcon onClick={() => navigate("/")} />
        </section>

        <section className="Ibox_descriptionSection">
          <div className="Ibox_iconPart">
            <EditNoteIcon fontSize="large" />
          </div>
          <div className="Ibox_contentPart">
            <h4>Description</h4>
            <div className="description_box">
            
              {!showDescription ? (
                <div className="Desc_Start">
                  <p>{currentTask.description}</p>
                  <button onClick={() => setShowDescription(true)}>Edit</button>
                </div>
              ) : (
                <>
                  <TextField
                    multiline
                    sx={{ width: "100%" }}
                    value={Description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <button
                    className="btn"
                    onClick={handleDescription}
                    style={{ backgroundColor: "blue", color: "white" }}
                  >
                    Save
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShowDescription(false);
                      setDescription(currentTask.description);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="Ibox_activitySection">
          <div className="Ibox_iconPart">
            <ClearAllIcon fontSize="medium" />
          </div>
          <div className="Ibox_contentPart">
            <div
              className="Ibox_activityHeaderDiv"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{display:"flex", justifyContent:"space-between", gap:"4rem",width:"100%"}}>
                <h4>Activity</h4>

                {showDetails ? (
                  <button onClick={() => setShowDetails(false)}>
                    Hide Details{" "}
                  </button>
                ) : (
                  <button onClick={() => setShowDetails(true)}>
                    Show Details
                  </button>
                )}
              </div>
                </div>
                        <div>
                            {
                                !showComment ? (
                                    <div style={{ textAlign: 'left', padding:'6px 14px ', backgroundColor:'lightgrey', marginTop:'10px' }}>
                                        <p onClick={() => setShowComment(true)}>Write a comment...</p>
                                    </div>
                                ) : (
                                    <>
                                        <TextField
                                            multiline
                                            sx={{ width: "100%" }}
                                            value={comment}
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }}
                                        />
                                        <button
                                            className="btn"
                                            onClick={handleCommentSubmit}
                                            style={{ backgroundColor: "blue", color: "white" }}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                setShowDescription(false);
                                                // setDescription(currentTask.description);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )
                            }
                            {
                                currentTask?.comments?.map((elem, ind) => {
                                    return (
                                        <div key={ind} className="comment_div">
                                            <div><p>{elem}</p></div>
                                            <span onClick={()=>handleCommentDelete(ind)}>Delete</span>
                                        </div>

                                    )
                                })
                            }
                        </div>

                        <div>
                            {showDetails && (
                                <div className="TimeDetail">
                                    <p> Created On : {currentTask.time}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
