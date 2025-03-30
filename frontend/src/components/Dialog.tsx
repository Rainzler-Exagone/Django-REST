import { Button, Dialog, Group, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NoteForm from "./NoteForm";
import FloatingButton from "./AddButton";

function FormDialog() {
    const [opened, { toggle, close }] = useDisclosure(false);

    return(
        <>
       <FloatingButton onToggle={toggle}/>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
        <NoteForm/>
      </Dialog>
        </>
    )
}