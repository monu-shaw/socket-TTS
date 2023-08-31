import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import Recieve from './recieve'
import Send from './send'
function RouteUi() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recieve' element={<Recieve/>} />
        <Route path='/send' element={<Send/>} />
    </Routes>
  )
}

export default RouteUi