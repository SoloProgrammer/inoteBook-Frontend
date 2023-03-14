
import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

import { useContext } from 'react';
import noteContext from './context/notes/noteContext';


function App() {
  
  const context = useContext(noteContext)
    const {show_Alert,alert } = context

  return (
    <>
      <BrowserRouter>
          <Navbar show_Alert={show_Alert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
                {
                  
                    localStorage.getItem("token") ?<Route  exact path="/" element={<Home show_Alert={show_Alert}/>}/>
                    : <Route exact path="/" element={ <Login show_Alert={show_Alert} />}/>
                }
              
              <Route exact path="/Login" element={ <Login show_Alert={show_Alert} />}/>

              <Route exact path="/Signup" element={ <Signup show_Alert={show_Alert}/>}/>
            
            </Routes>

          </div>
      </BrowserRouter>
    </>
  );
}

export default App;
