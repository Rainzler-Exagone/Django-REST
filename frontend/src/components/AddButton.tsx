import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/floatingButton.css";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import {   Modal} from "@mantine/core";
import NoteForm from "./NoteForm";

const FloatingButton = ({refreshNotes}:{refreshNotes: ()=>void}) => {
  const [opened, { toggle, close }] = useDisclosure(false);


  return (
    <div className="button-container">
     

      <motion.button
        className="floating-button"
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
       <Plus size={32}/>
      </motion.button>

     
      <Modal
        opened={opened}
        onClose={close}
        title="New Note"
        overlayProps={{
          blur: 10, // Blurs the background
        }}
        centered
      >
        <NoteForm closeModal={close} refreshNotes={refreshNotes}/>
      </Modal>

    </div>
  );
};

export default FloatingButton;
