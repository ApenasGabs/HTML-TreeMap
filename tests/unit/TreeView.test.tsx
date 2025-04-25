import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import TreeView from "../../src/components/TreeView/TreeView";

describe("TreeView Component", () => {
  test("renderiza sem erros", () => {
    render(<TreeView />);
    expect(
      screen.getByPlaceholderText(/Cole seu HTML aqui.../)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Gerar Árvore/i })
    ).toBeInTheDocument();
  });

  test("exibe a estrutura em árvore quando HTML válido é fornecido", () => {
    const html = '<div class="container"><p>Test</p></div>';
    render(<TreeView html={html} />);

    fireEvent.click(screen.getByText(/Gerar Árvore/));

    const output = screen.getByText(/div/, { selector: "pre" });
    expect(output).toBeInTheDocument();
    expect(
      screen.getByText(/container/, { selector: "pre" })
    ).toBeInTheDocument();
    expect(screen.getByText(/p/, { selector: "pre" })).toBeInTheDocument();
  });

  test("lida corretamente com entrada vazia", () => {
    render(<TreeView />);

    fireEvent.click(screen.getByText(/Gerar Árvore/));

    expect(
      screen.queryByText(/body/, { selector: "pre" })
    ).not.toBeInTheDocument();
  });

  test("permite ao usuário inserir seu próprio HTML", async () => {
    render(<TreeView />);

    const textarea = screen.getByPlaceholderText(/Cole seu HTML aqui.../);
    const html = '<section class="hero"><h1>Título</h1><p>Texto</p></section>';

    fireEvent.change(textarea, { target: { value: html } });
    fireEvent.click(screen.getByText(/Gerar Árvore/));

    expect(
      screen.getByText(/section/, { selector: "pre" })
    ).toBeInTheDocument();
    expect(screen.getByText(/hero/, { selector: "pre" })).toBeInTheDocument();
    expect(screen.getByText(/h1/, { selector: "pre" })).toBeInTheDocument();
    expect(screen.getByText(/p/, { selector: "pre" })).toBeInTheDocument();
  });

  test("atualiza a visualização quando novo HTML é inserido", () => {
    // Problema: O rerender não está funcionando corretamente.
    // Vamos criar um teste que mude o HTML diretamente em vez de usar rerender
    render(<TreeView />);

    // Inserir o primeiro HTML
    const textarea = screen.getByPlaceholderText(/Cole seu HTML aqui.../);
    const initialHtml = "<div><p>Inicial</p></div>";

    fireEvent.change(textarea, { target: { value: initialHtml } });
    fireEvent.click(screen.getByText(/Gerar Árvore/));

    expect(screen.getByText(/div/, { selector: "pre" })).toBeInTheDocument();
    expect(screen.getByText(/p/, { selector: "pre" })).toBeInTheDocument();

    // Inserir o segundo HTML
    const newHtml = "<header><nav>Menu</nav></header>";
    fireEvent.change(textarea, { target: { value: newHtml } });
    fireEvent.click(screen.getByText(/Gerar Árvore/));

    // Agora devemos ver os novos elementos
    expect(screen.getByText(/header/, { selector: "pre" })).toBeInTheDocument();
    expect(screen.getByText(/nav/, { selector: "pre" })).toBeInTheDocument();

    // E não devemos mais ver os elementos antigos
    expect(
      screen.queryByText(/div/, { selector: "pre" })
    ).not.toBeInTheDocument();
  });

  test("trata HTML malformado sem quebrar", () => {
    render(<TreeView />);

    const textarea = screen.getByPlaceholderText(/Cole seu HTML aqui.../);
    const malformedHtml = "<div><p>Parágrafo não fechado</div>";

    fireEvent.change(textarea, { target: { value: malformedHtml } });
    fireEvent.click(screen.getByText(/Gerar Árvore/));

    expect(screen.getByText(/div/, { selector: "pre" })).toBeInTheDocument();
    expect(screen.getByText(/p/, { selector: "pre" })).toBeInTheDocument();
  });
});
