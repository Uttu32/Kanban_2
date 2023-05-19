import React, {useState} from 'react'
import './Navbar.css';
import { HiStar,  } from "react-icons/hi2";
import { IoIosStarOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineChartBar, HiChevronDown } from "react-icons/hi";
import { HiOutlineRocketLaunch, HiBolt, HiBars3BottomLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ListData } from '../../Recoil/Atom/atom';

export default function Navbar() {

    const [stared, setStared] = useState(false) 
    const [listData, setListData] = useRecoilState(ListData)
    let navigate = useNavigate();

    function handleClear(){
        let input = [...listData];
        input = [];
        setListData(input);
        localStorage.clear("Card")
    }

    return (
        <>
        <div style={{display:"flex", alignItem:"start", opacity:"1.7"}}>
        {/* <Sidebar /> */}
            <nav className='nav_mainBackground'>
                <div className='nav_leftDiv'>
                    <h3>Home Task Management</h3>
                    
                    {
                        stared ? 
                            <p onClick={()=> setStared(false)}><HiStar/></p> :
                            <p onClick={()=> setStared(true)}><IoIosStarOutline/></p>
                    }

                    {/* <p><FaUserFriends/> &nbsp; Workspace visible </p>

                    <div>
                        <span><HiOutlineChartBar/> &nbsp; Board</span>
                        <span><HiChevronDown/></span>
                    </div> */}
                </div>

                <div className='nav_rightDiv'>
                    <p onClick={handleClear}><HiOutlineRocketLaunch /> &nbsp; Clean-Ups</p>
                    {/* <p><HiBolt/> &nbsp; Automation</p> */}
                    <p onClick={()=> navigate("/background")} ><HiBars3BottomLeft/> &nbsp; Background</p>

                </div>
            </nav>
            
            </div>
        </>
    )
}
