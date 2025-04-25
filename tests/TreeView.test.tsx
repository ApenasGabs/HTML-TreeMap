import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import TreeView from "../src/components/TreeView/TreeView";

describe("TreeView Component", () => {
  test("renders without crashing", () => {
    render(<TreeView />);
    expect(
      screen.getByPlaceholderText(/Cole seu HTML aqui.../)
    ).toBeInTheDocument();
  });

  test("displays parsed tree structure when valid HTML is provided", () => {
    const html = '<div class="container"><p>Test</p></div>';
    render(<TreeView html={html} />);

    fireEvent.click(screen.getByText(/Gerar Árvore/));

    const preElement = screen.getByText(/body/, { selector: "pre" });
    expect(preElement).toBeInTheDocument();
    expect(
      screen.getByText(/div \(container\)/, { selector: "pre" })
    ).toBeInTheDocument();
    expect(screen.getByText(/p/, { selector: "pre" })).toBeInTheDocument();
  });

  test("handles empty input gracefully", () => {
    render(<TreeView />);

    fireEvent.click(screen.getByText(/Gerar Árvore/));

    expect(screen.queryByRole("pre")).not.toBeInTheDocument();
  });
});
