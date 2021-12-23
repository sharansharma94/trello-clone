import { createContext, useContext } from "react";

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
    { id: "0", text: "To Do 1", tasks: [{ id: "1", text: "To Do inner" }] },
    { id: "1", text: "To Do 2", tasks: [] },
  ],
};

interface AppStateContextProps {
  state: AppState;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <AppStateContext.Provider value={{ state: appState }}>
      {children}
    </AppStateContext.Provider>
  );
};

//hook

export const useAppState = () => {
  return useContext(AppStateContext);
};
