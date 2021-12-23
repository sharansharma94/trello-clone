import AddNewItem from "./AddNewItem";
import { ColumnContainer, ColumnTitle } from "./styles";

interface ColumnProps {
  text: string;
  index: number;
}
export const Column = ({
  text,
  children,
  index,
}: React.PropsWithChildren<ColumnProps>) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      ></AddNewItem>
    </ColumnContainer>
  );
};
