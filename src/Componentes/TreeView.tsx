import React, { useState } from "react";
import "./TreeView.css";
interface NodeStructure {
  tag: string;
  classes?: string;
  children: NodeStructure[];
}

/**
 * TreeView component that renders an HTML structure as a tree visualization.
 * 
 * This component provides a text area for inputting HTML code, which is then parsed and
 * displayed as a hierarchical tree structure, showing the relationships between HTML elements
 * and their classes.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} [props.html=""] - Initial HTML string to parse
 * @returns {JSX.Element} A component with text input area, analyze button, and tree output
 */
const TreeView: React.FC<{ html?: string }> = ({ html = "" }) => {
  const [inputHtml, setInputHtml] = useState<string>(html);
  const [structure, setStructure] = useState<NodeStructure | null>(null);

  const generateStructureText = (
    node: NodeStructure,
    depth = 0,
    isLast = false,
    parentPrefix = ""
  ): string => {
    if (depth === 0) {
      let line = node.tag;
      if (node.classes) line += ` (${node.classes})`;

      const childLines = node.children
        .map((child, index) =>
          generateStructureText(
            child,
            depth + 1,
            index === node.children.length - 1,
            ""
          )
        )
        .join("\n");

      return [line, childLines].filter(Boolean).join("\n");
    }

    const currentPrefix = parentPrefix + (isLast ? "    " : "│   ");
    let line = parentPrefix;
    line += isLast ? "└── " : "├── ";
    line += node.tag;
    if (node.classes) line += ` (${node.classes})`;

    const childLines = node.children
      .map((child, index) =>
        generateStructureText(
          child,
          depth + 1,
          index === node.children.length - 1,
          currentPrefix
        )
      )
      .join("\n");

    return [line, childLines].filter(Boolean).join("\n");
  };
  const parseHtmlToStructure = (html: string): NodeStructure | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        html.includes("<body>") ? html : `<body>${html}</body>`,
        "text/html"
      );

      const parseElement = (element: Element): NodeStructure => ({
        tag: element.tagName.toLowerCase(),
        classes:
          element.classList.length > 0
            ? Array.from(element.classList).join(" ")
            : undefined,
        children: Array.from(element.children).map(parseElement),
      });

      return parseElement(doc.body);
    } catch (error) {
      console.error("Parsing error:", error);
      return null;
    }
  };

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
