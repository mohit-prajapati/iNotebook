import React, { useState, useContext } from 'react'
import noteContext from '../Context/Notes/NoteContext'

export const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.desc, note.tag);
    }

    const [note, setNote] = useState({title: "", desc: "", tag: "defult"})
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <div className="container">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea className="form-control" name="desc" id="desc" rows="5" onChange={onChange}></textarea>
                        {/* <input type="text" className="form-control" id="desc" name="desc"/> */}
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}
