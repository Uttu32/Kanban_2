import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../../App'
import ItemBox from '../ItemBox/ItemBox'


export default function Routing() {
  return (
    <div>
        <Routes>
            <Route path='/*' element={<App/>} />
            <Route path='/:Cid/:Lid/edit' element={<ItemBox/>} />
        </Routes>
    </div>
  )
}

