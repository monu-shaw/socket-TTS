import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import Recieve from './recieve'
import Send from './send'
import Reader from './reader'
function RouteUi() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recieve' element={<Recieve/>} />
        <Route path='/send' element={<Send/>} />
        <Route path='/loudreader' element={<Reader/>} />
    </Routes>
  )
}

export default RouteUi

export const BaseRoute = 'https://redesigned-winner-wx5qg64qrpq2gw6r-3000.app.github.dev/'