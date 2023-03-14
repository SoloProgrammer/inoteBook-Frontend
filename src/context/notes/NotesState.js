import { useState } from "react";
import NoteContext from "./noteContext";
import {server} from '../../configs/server.js'

const NoteState = (props) => {

  const host = server.URL.production
  
  const [alert,setAlert] = useState(null)

  const show_Alert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  const getallnotes = async () => {
    show_Alert("Loading","warning")
    const res = await fetch(`${host}/api/note/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      })
    const Json = await res.json();
    
    setNotes(Json.notes)

    setAlert(null)

    return Json
  }

  let Initialnotes = []
  const [notes, setNotes] = useState(Initialnotes)

  const addnote = async (title, description, tag,show_Alert,setNote) => {
    show_Alert("Loading","warning")

    //Api Call
    const res = await fetch(`${host}/api/note/Addanote`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })

      })

    const notedetail = {
      title:"",
      description:"",
      tag:""
    }
    const json = await res.json()


    if(json.status){
      show_Alert("Note Added Sucessfully", "info")
      getallnotes();
      setNote(notedetail)
    }
    else{
      show_Alert("Note tag should not contain numbers", "danger")

    }

  }



  const Deletenote = async (id,show_Alert) => {
    // TODO Api call
    // Api Call
    show_Alert("Loading","warning")

    await fetch(`${host}/api/note/Deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        }

      })
    const newnote = notes.filter((note) =>  note._id !== id )
    setAlert(null)
    setNotes(newnote);
    show_Alert("Note Deleted","success")
    // console.log(id)
  }
  const Updatenote = async (id, title, description, tag,show_Alert) => {
    show_Alert("Loading","warning")
    await fetch(`${host}/api/note/Updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })

      })

    let updatednotes = await getallnotes();

    setNotes(updatednotes.notes)
    show_Alert("Note Updated Successfully","success")

  }

  const [userdetail,setUserdetail] = useState([])

  const Getuser = async () => {
    show_Alert("Loading","warning")
    const res = await fetch(`${host}/api/auth/getuser`,
    {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    const json = await res.json()

    // console.log(json)
    
    setUserdetail({
      "Name":json.name1,
      "Email":json.email,
      "id":json._id
    })

    
  }
  const[allusers,setAllusers] = useState([])
  

  return (

    <NoteContext.Provider value={{alert,show_Alert, userdetail,notes, addnote, Deletenote, Updatenote, getallnotes,Getuser,setAllusers,allusers}}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState