import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './components/Header'
import Homepage from './Pages/Homepage'
import Coinpage from './Pages/Coinpage'

function App() {


  return (
    <BrowserRouter>
      <div style={{background :"#14161a",color:"white",height:"100vh"}}>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Homepage/>}/>
          <Route path='/coins/:id' element={<Coinpage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
