import AddNewItem from "./AddNewItem";
import "./App.css";
import Card from "./Card";
import { Column } from "./Column";
import { AppContainer } from "./styles";

function App() {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Generate app scaffold"></Card>
        <Card text="Generate app scaffold"></Card>
        <Card text="Generate app scaffold"></Card>
      </Column>
      <Column text="To Do">
        <Card text="Generate app scaffold"></Card>
      </Column>
      <Column text="To Do">
        <Card text="Generate app scaffold"></Card>
      </Column>
      <AddNewItem
        toggleButtonText="+ Add Another list"
        onAdd={console.log}
      ></AddNewItem>
    </AppContainer>
  );
}

export default App;
