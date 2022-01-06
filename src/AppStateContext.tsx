import { v4 as uuid } from "uuid";
import { createContext, useContext, useReducer } from "react";
import { findItemIndexById } from "./utils/findItemIndexById";
import { moveItem } from "./utils/moveItem";
import { DragItem } from "./utils/DragItem";

interface Task {
  id: string;
  text: string;
}
interface List {
  id: string;
  text: string;
  tasks: Task[];
}
interface AppState {
  lists: List[];
  draggedItem?: DragItem;
}

const appState: AppState = {
  lists: [
    { id: "0", text: "To Do 1", tasks: [{ id: "1", text: "To Do inner" }] },
    { id: "1", text: "To Do 2", tasks: [] },
  ],
};

//technique in called discriminated union

type Action =
  | { type: "ADD_LIST"; payload: string }
  | { type: "ADD_TASK"; payload: { text: string; taskId: string } }
  | { type: "MOVE_LIST"; payload: { dragIndex: number; hoverIndex: number } }
  | { type: "SET_DRAGGED_ITEM"; payload: DragItem | undefined }
  | {
      type: "MOVE_CARD";
      payload: {
        dragIndex: number;
        hoverIndex: number;
        sourceColumn: string;
        targetColumn: string;
      };
    };

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuid(), text: action.payload, tasks: [] },
        ],
      };
    }
    case "ADD_TASK": {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.taskId
      );
      state.lists[targetLaneIndex].tasks.push({
        id: uuid(),
        text: action.payload.text,
      });
      return { ...state };
    }

    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);
      return { ...state };
    }
    case "MOVE_CARD": {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } =
        action.payload;

      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn);
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn);

      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];

      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);
      return { ...state };
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload };
    }

    default:
      return state;
  }
};
interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appState);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

//hook

export const useAppState = () => {
  return useContext(AppStateContext);
};
