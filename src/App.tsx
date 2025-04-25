import "./App.css";
import TreeView from "./Componentes/TreeView";

function App() {
  return (
    <>
      <h1>
        <code>{`<TreeView />`}</code> 🌳
      </h1>

      <TreeView html={`<div><p>Exemplo</p></div>`} />
    </>
  );
}

export default App;
