import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";

function NoteForm({closeModal,refreshNotes}) {
const [content, setContent] = useState("");
const [title, setTitle] = useState("");

  
const createNote = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201){ toast.success("Note Created!");
          refreshNotes()
        closeModal();
  
        }
        else toast.error("Filed Creating a Note!");
        console.log(res);
      })
      .catch((error) => toast.error(error));
  };


  return (
    <form onSubmit={createNote}>
    <label htmlFor="title">Title : </label>
    <input type="text" id="title" name="title" value={title} required onChange={(e)=>setTitle(e.target.value)}/>
    <label htmlFor="content">Content : </label>
    <br />
    <textarea name="content" id="content" required value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
    <input type="submit" value="Submit" ></input>
</form>
  );
    
}


export default NoteForm;