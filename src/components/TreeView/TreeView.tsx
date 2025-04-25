import { parseHtmlToStructure } from "@utils/htmlParser";
import { generateStructureText } from "@utils/treeFormatter";
import { FC, useState } from "react";
import "./TreeView.css";
import { NodeStructure } from "./types";

const TreeView: FC<{ html?: string }> = ({ html = "" }) => {
  const [inputHtml, setInputHtml] = useState<string>(html);
  const [structure, setStructure] = useState<NodeStructure | null>(null);

  const handleAnalyze = () => {
    setStructure(parseHtmlToStructure(inputHtml));
  };

  return (
    <div className="tree-view-container">
      <textarea
        value={inputHtml}
        onChange={(e) => setInputHtml(e.target.value)}
        placeholder="Cole seu HTML aqui..."
      />
      <button onClick={handleAnalyze}>Gerar Árvore</button>

      {structure && <pre>{generateStructureText(structure)}</pre>}
    </div>
  );
};

export default TreeView;
