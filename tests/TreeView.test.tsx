import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TreeView from '../src/components/TreeView/TreeView';

describe('TreeView Component', () => {
  test('renders without crashing', () => {
    render(<TreeView />);
    expect(screen.getByPlaceholderText(/Cole seu HTML aqui.../)).toBeInTheDocument();
  });

  test('displays parsed tree structure when valid HTML is provided', () => {
    const html = '<div class="container"><p>Test</p></div>';
    render(<TreeView html={html} />);
    
    fireEvent.click(screen.getByText(/Gerar Árvore/));
    
    expect(screen.getByText(/div/)).toBeInTheDocument();
    expect(screen.getByText(/p/)).toBeInTheDocument();
  });

  test('handles empty input gracefully', () => {
    render(<TreeView />);
    
    fireEvent.click(screen.getByText(/Gerar Árvore/));
    
    expect(screen.queryByText(/div/)).not.toBeInTheDocument();
  });
});