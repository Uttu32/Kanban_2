import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import "./Task.css"
export default function Task() {
    const [isHovered, setIsHovered] = useState(false);
    const [state, setState] = useState({ id: Math.random(), description: "", title: "" });
    const [pressed, setPressed] = useState(true)
    function changeHandler(e) {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    function submitHandler(e) {
        e.preventDefault();
        if (state.title === "") {
            return
        }
        setPressed(false);
    }

    function editHandler() {
        setPressed(true);
        console.log(state);
    }

    return (
        <div className='father' >
            <form className='parent' onSubmit={submitHandler}  >
                <input className={pressed == true ? "inputfeild" : "inputArea"}
                    name='title' value={state.title} onChange={changeHandler} />

                <button className={pressed == true ? "buttonfeild" : "buttonArea"} type='submit' >Add</button>

                <h4 className={pressed == true ? "DisplayArea" : "displayfeild"} >{state.title}</h4>


            </form >
            <button className={pressed == true ? "editfeild" : "editArea"} onClick={editHandler} ><EditIcon fontSize='small' /></button>
        </div>
    )
};
