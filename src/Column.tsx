import { useRef } from "react";
import { useDrop } from "react-dnd";
import AddNewItem from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import Card from "./Card";
import { useItemDrag } from "./hooks/useItemDrag";
import { ColumnContainer, ColumnTitle } from "./styles";
import { DragItem } from "./utils/DragItem";

interface ColumnProps {
  text: string;
  index: number;
  taskId: string;
}
export const Column = ({
  text,
  index,
  taskId,
}: React.PropsWithChildren<ColumnProps>) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: "COLUMN", id: taskId, index, text });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>

      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text: string) =>
          dispatch({
            type: "ADD_TASK",
            payload: { taskId, text },
          })
        }
        dark
      ></AddNewItem>
    </ColumnContainer>
  );
};
