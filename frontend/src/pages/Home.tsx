import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import toast, { Toaster } from "react-hot-toast";
import { Container, Grid } from '@mantine/core';
import { AnimatePresence, motion } from "motion/react"
import FloatingButton from "../components/AddButton";
import NoteForm from "../components/NoteForm";



function Home() {
  const [notes, setNotes] = useState([]);
  

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
      .catch((error) => toast.error(error));
  };

  const deletNote = (id: number) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) toast.success("Note deleted!");
        else toast.error("Error deleting note!");
        getNotes();
      })
      .catch((error) => toast.error(error));
  };


 
  return (
    <>
    <Toaster/>
    {/* <h1>Notes</h1> */}
    <h1 className="home-title">Notesify</h1>
    <FloatingButton refreshNotes={getNotes}/>
      <Container my="md">
      <Grid>
        {notes.map((note,index)=>(
            <Grid.Col 
            span={{ base: 12, xs: 4 }} 
            key={index}

                       >
            <motion.div  initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move 50px down
      animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and original position
      transition={{ duration: index === 0 ? 0.1 : 2 /5, ease: "easeOut" }} // Smooth transition
      >
              <Note note={note} onDelete={deletNote} />
            </motion.div>
            </Grid.Col>
        ))}
      </Grid>
    </Container>
   
    </>
  )
}

export default Home;
