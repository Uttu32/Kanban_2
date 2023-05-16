import React, { useState, useEffect } from 'react'
import './ItemBox.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useNavigate, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { ListData } from '../../Recoil/Atom/atom';


export default function ItemBox() {

    console.log("I am Item Box");

    const [showDescription, setShowDescription] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [Description, setDescription] = useState('Add a more detailed description...')

    const [currentCardTitle, setCurrentCardTitle] = useState('')
    const [currentTaskTitle, setCurrentTaskTitle] = useState('')

    const navigate = useNavigate()
    const { Cid, Lid } = useParams();

    const [listData, setListData] = useRecoilState(ListData)

    useEffect(()=> {
        let input = [...listData]
        console.log(input);
        let index = input.findIndex( (ele)=> ele.id === Cid )

        let currentCard = {...input[index]}
        setCurrentCardTitle(currentCard.listName)
        
        let taskss = {...currentCard}
        let Task = [...taskss.task]; 
        // console.log(Task);

        let taskindex = Task.findIndex((ele)=> ele.id === Lid)
        // console.log(Task[taskindex]);

        let currentTask = Task[taskindex];

        setCurrentTaskTitle(currentTask)
        console.log(currentTask);

    } , [])

    function handleDescription(){
        let input = {...currentTaskTitle}
        input.description = Description;
        console.log(Description);
        console.log(input, "global");
        // setListData(input);
        setShowDescription(false);
    }



    return (
        <div className='Ibox_mainBackground'>
            <div className="Ibox_container">

                <section className='Ibox_titleSection'>
                    <div>
                        <div className='Ibox_iconPart'>
                            <CreditCardIcon />
                        </div>
                        <div className='Ibox_contentPart'>
                            <h3>{currentTaskTitle.title}</h3>
                            <p>in List {currentCardTitle}</p>
                            <br />
                            <h5>Notifications</h5>
                            <button><RemoveRedEyeIcon fontSize='small' /> &nbsp; Watch</button>
                        </div>
                    </div>
                    <CloseIcon onClick={()=> navigate('/') }/>
                </section>

                <section className='Ibox_descriptionSection'>
                    <div className="Ibox_iconPart">
                        <EditNoteIcon fontSize='large' />
                    </div>
                    <div className="Ibox_contentPart">
                        <h4>Description</h4>
                        <div className='description_box'>
                            {Description}
                            {
                                !showDescription ?
                                    <p onClick={() => setShowDescription(true)}>{currentTaskTitle.description}</p> :
                                    <>
                                        <ReactQuill theme="snow" value={Description}  onChange={(value)=> 
                                        {console.log(value, "Point")
                                        setDescription(value)}
                                        } />
                                        <button className='btn' 
                                        onClick={handleDescription}
                                        style={{ backgroundColor: 'blue', color: 'white' }}>Save</button>
                                        <button className='btn' onClick={() => setShowDescription(false)}>Cancel</button>
                                    </>
                            }
                        </div>
                    </div>
                </section>

                <section className='Ibox_activitySection'>
                    <div className='Ibox_iconPart'>
                        <ClearAllIcon fontSize='medium' />
                    </div>
                    <div className='Ibox_contentPart'>
                        <div className='Ibox_activityHeaderDiv'>
                            <h4>Activity</h4>
                            {
                                showDetails ?
                                    <button  onClick={() => setShowDetails(false)}>Hide Details </button> :
                                    <button  onClick={() => setShowDetails(true)}>Show Details</button>
                            }


                            {
                                showDetails && 
                                    <div>
                                        {/* map function will run here  */}
                                    </div>
                            }
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
