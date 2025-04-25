import { NodeStructure } from "@components/TreeView/types";

/**
 * Generates a string representation of a tree structure with hierarchical indentation.
 *
 * @param node - The tree node to format
 * @param depth - The current depth in the tree (used for recursion)
 * @param isLast - Whether the current node is the last child of its parent
 * @param parentPrefix - The indentation prefix to use (used for recursion)
 * @returns A string representation of the tree with proper indentation
 *
 * @example
 * const tree = {
 *   tag: 'div',
 *   classes: 'container',
 *   children: [
 *     { tag: 'h1', classes: 'title' },
 *     { tag: 'p', classes: 'content' }
 *   ]
 * };
 *
 * const formatted = generateStructureText(tree);
 * // Output:
 * // div (container)
 * // ├── h1 (title)
 * // └── p (content)
 */
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

export { generateStructureText };
