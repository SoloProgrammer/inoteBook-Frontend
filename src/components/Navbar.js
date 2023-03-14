import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';


function Navbar(props) {

  const navigate = useNavigate();

  const context = useContext(noteContext)

  const { userdetail } = context

  const handlelogout = () => {
    localStorage.removeItem("token")
    navigate("/Login")
  }
  const click1 = (msg) => {
    props.show_Alert(msg, "danger");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {localStorage.getItem("token")  && localStorage.getItem("token") !== "true" && <i className="fa-solid fa-circle-user">

          <div className="userbox">
            <h2><i className="fa-solid fa-user-check mx-2"></i>{userdetail.Name}</h2>
            <h3>Logged in As</h3>
            <h4>{userdetail.Email}</h4>
          </div>

        </i>}
        <Link className="navbar-brand" to="/">inoteBook <small style={{fontSize:".9rem",fontWeight:"bold",margin:"0 .5rem  0"}} >( Your notes on cloud..! )</small> </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          {!localStorage.getItem("token") ? <form className="d-flex">
            <Link className="btn btn-outline-primary  mx-2" to="/Login">Login</Link>
            <Link className=" btn btn-outline-primary" to="/Signup">Sign-up</Link>
          </form> : <button onClick={handlelogout} className=" btn btn-outline-primary" >Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
