import React, { createContext } from "react";

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
}

const appState: AppState = {
  lists: [
    { id: "0", text: "To Do", tasks: [{ id: "0", text: "To Do" }] },
    { id: "1", text: "To Do", tasks: [] },
  ],
};

interface AppStateContextProps {
  state: AppState;
}
export default function AppStateContext() {
  const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
  );
  return <div></div>;
}
