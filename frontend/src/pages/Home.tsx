import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };

  const deletNote = (id: number) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Error deleting note!");
        getNotes();
      })
      .catch((error) => alert(error));
  };


  const createNote  = () =>{
      api.post("/api/notes/", {title, content}).then((res)=>{
        if(res.status === 201) alert("Note created!");
        else alert("Filed Creating a Note!");
        getNotes();
      }).catch((error: unknown) => alert(error));

  }

  return (
    <>
    <h1>Notes</h1>
    {notes.map((note) => (
        <Note note={note} onDelete={deletNote}/>
    ))}
    <p>Create Note</p>
    <form onSubmit={createNote}>
        <label htmlFor="title">Title : </label>
        <input type="text" id="title" name="title" value={title} required onChange={(e)=>setTitle(e.target.value)}/>
        <label htmlFor="content">Content : </label>
        <br />
        <textarea name="content" id="content" required value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
        <input type="submit" value="Submit" />
    </form>
    </>
  )
}

export default Home;
