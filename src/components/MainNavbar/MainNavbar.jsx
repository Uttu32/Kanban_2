import React from 'react'
import './MainNavbar.css'

import { HiChevronDown } from "react-icons/hi";

export default function MainNavbar() {
  return (
    <>
        <nav className='Mnav_background'>
            <div className='Mnav_leftDiv'>
                <div>
                    <img src="https://media.tenor.com/LSHKMiRdLggAAAAj/statistics-trending-up.gif" alt="" />
                    <h2>Kanban Board</h2>
                </div>

                {/* <p>Workspaces &nbsp; <HiChevronDown/></p>
                
                <p>Recent &nbsp; <HiChevronDown/></p>
                
                <p>Starred &nbsp; <HiChevronDown/></p>
                
                <p>Templates &nbsp; <HiChevronDown/></p>

                <p><span>Create</span></p> */}
            </div>

            <div className='Mnav_rightDiv'>

            </div>
        </nav>
    </>
  )
}
