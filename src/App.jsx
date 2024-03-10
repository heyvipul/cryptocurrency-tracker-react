import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './components/Header'
import Homepage from './Pages/Homepage'
import Coinpage from './Pages/Coinpage'
import { makeStyles } from "@mui/styles";

function App() {

  const useStyles = makeStyles(()=>({
     App : {
      background : "#14161a",
      color : "white",
      height : "100vh"
     }
  }))
  
  const classess = useStyles();

  return (
    <BrowserRouter>
      <div className={classess.App}>
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
