import { useRef } from "react";
import { useDrop } from "react-dnd";
import AddNewItem from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import Card from "./Card";
import { useItemDrag } from "./hooks/useItemDrag";
import { ColumnContainer, ColumnTitle } from "./styles";
import { DragItem } from "./utils/DragItem";
import { isHidden } from "./utils/isHidden";

interface ColumnProps {
  isPreview?: boolean;
  text: string;
  index: number;
  taskId: string;
}
export const Column = ({
  text,
  index,
  taskId,
  isPreview,
}: React.PropsWithChildren<ColumnProps>) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({
    type: "COLUMN",
    id: taskId,
    index,
    text,
  });

  const [, drop] = useDrop({
    accept: ["CARD", "COLUMN"],
    drop: (item: DragItem) => {
      if (item.type === "COLUMN") {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }
        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceColumn = item.columnId;
        const targetColumn = taskId;

        if (sourceColumn === targetColumn) return;

        dispatch({
          type: "MOVE_CARD",
          payload: {
            dragIndex,
            hoverIndex,
            sourceColumn,
            targetColumn,
          },
        });

        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    },
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", taskId)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>

      {state.lists[index]?.tasks.map((task, i) => (
        <Card
          id={task.id}
          columnId={taskId}
          text={task.text}
          index={i}
          key={task.id}
        />
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
