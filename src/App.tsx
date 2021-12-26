import AddNewItem from "./AddNewItem";
import "./App.css";
import { useAppState } from "./AppStateContext";
import { Column } from "./Column";
import { AppContainer } from "./styles";

function App() {
  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} index={i} taskId={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+Add another list"
        onAdd={(text) => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </AppContainer>
  );
}

export default App;
