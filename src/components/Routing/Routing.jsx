import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../../App'
import ItemBox from '../ItemBox/ItemBox'
import PageNotFound from '../PageNotFound/PageNotFound'
import BackgroundCard from '../Background_Image_Card/BackgroundCard'


export default function Routing() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/:Cid/:Lid/edit' element={<ItemBox/>} />
            <Route path="*" element={<PageNotFound />}/>
            <Route path="/background" element={<BackgroundCard />}/>
        </Routes>
    </div>
  )
}

