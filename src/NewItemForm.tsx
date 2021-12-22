import { useState } from "react";
import useFocus from "./hooks/useFocus";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "./styles";

interface NewItemFormProps {
  onAdd(text: string): void;
}
export default function NewItemForm({ onAdd }: NewItemFormProps) {
  const [text, setText] = useState("");
  const focus = useFocus();
  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={focus}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
}
