import { Card, Text } from "@mantine/core";
import "../styles/Note.css";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
    created_at: string;
  };
  onDelete: (id: number) => void;
}

function Note({ note, onDelete }: NoteProps) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <Card
      withBorder
      radius="md"
      padding="xl"
      bg="var(--mantine-color-body)"
      className="note-container"
    >
      <p className="note-title">{note.title}</p>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {note.content}{" "}
      </Text>
      <p className="note-date">{formattedDate}</p>
      <button
        className="delete-button"
        title="delete-button"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </Card>
  );
}

export default Note;
