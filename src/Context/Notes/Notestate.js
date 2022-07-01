import React, {useState} from "react";
import NoteContext from "./NoteContext";

const Notestate = (props) => {
    const Host = "http://localhost:5000";
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // get a Note
    const getNotes = async ()=>{
        // API Call
        const response = await fetch(`${Host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4NWVjMTMwYTQ5ZjM5MWQ0NWM3MjVjIn0sImlhdCI6MTY1Mjk0MzkyMX0.bJiecRYDEs2wRNHt3NLSnKMpExBNP5YiiErHcPQSjKE'
            },
          });
        const json = await response.json();
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag)=>{
        // API Call
        const response = await fetch(`${Host}/api/notes/addNotes`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4NWVjMTMwYTQ5ZjM5MWQ0NWM3MjVjIn0sImlhdCI6MTY1Mjk0MzkyMX0.bJiecRYDEs2wRNHt3NLSnKMpExBNP5YiiErHcPQSjKE'
            },
            body: JSON.stringify({title, description, tag})
          });
        //   return response.json();
        //   const json = response.json();
        // Logic to edit in client
        const note = await response.json();
        setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = async (id)=>{
        // API Call
        console.log(id)
        const response = await fetch(`${Host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4NWVjMTMwYTQ5ZjM5MWQ0NWM3MjVjIn0sImlhdCI6MTY1Mjk0MzkyMX0.bJiecRYDEs2wRNHt3NLSnKMpExBNP5YiiErHcPQSjKE'
            },
          });
        const json = await response.json();
        setNotes(json)
    }
    // Edit a Note
    const editNote = async (id, title, description, tag)=>{
        // API Call
        const response = await fetch(`${Host}/api/notes/updateNote/${id}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4NWVjMTMwYTQ5ZjM5MWQ0NWM3MjVjIn0sImlhdCI6MTY1Mjk0MzkyMX0.bJiecRYDEs2wRNHt3NLSnKMpExBNP5YiiErHcPQSjKE'
            },
            body: JSON.stringify({title, description, tag})
          });
        //   return response.json();
        //   const json = response.json();
        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) 
            {
                element.title = title;
                element.desc = description;
                element.tag = tag;
            }
        }
        setNotes()
    }
    // const s1 = {
    //     "name": "Mohit",
    //     "class":"10A"
    // }
    // const [state, setState] = useState(s1);
    // const update = ()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "Mohit Prajapati",
    //             "class":"12A" 
    //         })
    //     }, 1000);
    // }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {/* <NoteContext.Provider value={{state, update}}> */}
            {props.children}
        </NoteContext.Provider>
    )
}


export default Notestate;