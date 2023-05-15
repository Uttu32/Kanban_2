import React, { useState } from 'react'
import './ItemBox.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export default function ItemBox() {

    const [showDescription, setShowDescription] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [description, setDescription] = useState('')

    return (
        <div className='Ibox_mainBackground'>
            <div className="Ibox_container">

                <section className='Ibox_titleSection'>
                    <div>
                        <div className='Ibox_iconPart'>
                            <CreditCardIcon />
                        </div>
                        <div className='Ibox_contentPart'>
                            <h3>'Task item name'</h3>
                            <p>in List 'To Do'</p>
                            <br />
                            <h5>Notifications</h5>
                            <button><RemoveRedEyeIcon fontSize='small' /> &nbsp; Watch</button>
                        </div>
                    </div>
                    <CloseIcon />
                </section>

                <section className='Ibox_descriptionSection'>
                    <div className="Ibox_iconPart">
                        <EditNoteIcon fontSize='large' />
                    </div>
                    <div className="Ibox_contentPart">
                        <h4>Description</h4>
                        <div className='description_box'>
                            {
                                !showDescription ?
                                    <p onClick={() => setShowDescription(true)}><span>Add a more detailed description...</span></p> :
                                    <>
                                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                                        <button className='btn' style={{ backgroundColor: 'blue', color: 'white' }}>Save</button>
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
                                    <div></div>
                            }
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
