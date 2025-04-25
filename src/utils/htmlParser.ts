import { NodeStructure } from "@components/TreeView/types";

/**
 * Parses an HTML string into a hierarchical NodeStructure object representation.
 * The function creates a tree structure where each node represents an HTML element
 * with its tag name, classes, and child elements.
 *
 * @param html - The HTML string to parse into a structure
 * @returns A NodeStructure object representing the body element and its children,
 *          or null if parsing fails
 *
 * @example
 * const html = '<div class="container"><p>Hello world</p></div>';
 * const structure = parseHtmlToStructure(html);
 * // Returns: {
 * //   tag: 'body',
 * //   children: [
 * //     {
 * //       tag: 'div',
 * //       classes: 'container',
 * //       children: [
 * //         { tag: 'p', children: [] }
 * //       ]
 * //     }
 * //   ]
 * // }
 */
const parseHtmlToStructure = (html: string): NodeStructure | null => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

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

export { parseHtmlToStructure };
