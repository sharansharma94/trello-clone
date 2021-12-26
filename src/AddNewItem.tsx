import { useState } from "react";
import NewItemForm from "./NewItemForm";
import { AddItemButton } from "./styles";

interface AddNewItemProps {
  onAdd(text: string, taskId?: string): void;
  toggleButtonText: string;
  dark?: boolean;
}
export default function AddNewItem({
  onAdd,
  toggleButtonText,
  dark,
}: AddNewItemProps) {
  const [showForm, setShowform] = useState(false);

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowform(false);
        }}
      ></NewItemForm>
    );
  }
  return (
    <AddItemButton dark={dark} onClick={() => setShowform(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
}
