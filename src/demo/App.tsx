import React from "react";
import TreeView from "../components/TreeView";

const App: React.FC = () => {
  const sampleHtml = `<div class="container"><h1>Hello World</h1><p>This is a sample HTML structure.</p></div>`;

  return (
    <div>
      <h1>
        <code>{`<TreeView />`}</code> 🌳
      </h1>
      <TreeView html={sampleHtml} />
    </div>
  );
};

export default App;
