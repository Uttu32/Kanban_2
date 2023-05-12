import React, {useState} from 'react'
import './Navbar.css'

import { HiStar,  } from "react-icons/hi2";
import { IoIosStarOutline } from "react-icons/io";

import { FaUserFriends } from "react-icons/fa";
import { HiOutlineChartBar, HiChevronDown } from "react-icons/hi";
import { HiOutlineRocketLaunch, HiBolt, HiBars3BottomLeft } from "react-icons/hi2";
import Sidebar from '../sidebar/Sidebar';



export default function Navbar() {

    const [stared, setStared] = useState(false) 

    return (
        <>
        <div style={{display:"flex", alignItem:"start"}}>
        {/* <Sidebar /> */}
            <nav className='nav_mainBackground'>
                <div className='nav_leftDiv'>
                    <h3>Home Task Management</h3>
                    
                    {
                        stared ? 
                            <p onClick={()=> setStared(false)}><HiStar/></p> :
                            <p onClick={()=> setStared(true)}><IoIosStarOutline/></p>
                    }

                    <p><FaUserFriends/> &nbsp; Workspace visible </p>

                    <div>
                        <span><HiOutlineChartBar/> &nbsp; Board</span>
                        <span><HiChevronDown/></span>
                    </div>
                </div>

                <div className='nav_rightDiv'>
                    <p><HiOutlineRocketLaunch /> &nbsp; Power-Ups</p>
                    <p><HiBolt/> &nbsp; Automation</p>
                    <p><HiBars3BottomLeft/> &nbsp; Filter</p>

                </div>
            </nav>
            
            </div>
        </>
    )
}
