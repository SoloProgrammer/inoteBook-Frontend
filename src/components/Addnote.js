// import React,{useContext,useState} from 'react'
import React from 'react'

// import noteContext from '../context/notes/noteContext'
import Form from './Form'

function Addnote(props) {
    const notedetail = {
      title:"",
      description:"",
      tag:""
    }
  return (
    <div className="container" style={{"marginTop":"2.3em"}} >
      <h2> <span> <img style={{width:'2.3rem',margin:"0 0 .3rem"}} src="https://cdn-icons-png.flaticon.com/512/8140/8140240.png" alt="" /> </span> Add a new Note</h2>

        <Form show_Alert={props.show_Alert}  notedetail={notedetail} curdFunc = {"addnote"} submit_txt = {"Add note"}/>
        
      </div>
  )
}

export default Addnote
