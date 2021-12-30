import { useDrag } from "react-dnd";
import { useAppState } from "../AppStateContext";
import { DragItem } from "../utils/DragItem";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    type: item.type,
    item: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: item }),
    end: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: undefined }),
  });

  return { drag };
};
