import ReactDOM from 'react-dom/client'
import RouteUi from './component/rotes'
//import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
      <RouteUi/>
    </BrowserRouter>
  
)