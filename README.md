# README.md

# HTML Tree View

This project provides a React component named `TreeView` that visualizes HTML structures as a tree. It allows users to input HTML code and see a hierarchical representation of the elements, including their tags and classes.

## Features

- Input HTML code and visualize it as a tree structure.
- Displays the relationships between HTML elements.
- Easy to integrate into other React applications.

## Installation

To use the `TreeView` component in your project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/apenasgabs/html-tree-view.git
   ```

2. Navigate to the project directory:
   ```
   cd html-tree-view
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To use the `TreeView` component, import it into your React application:

```tsx
import TreeView from './components/TreeView';

function App() {
  return (
    <div>
      <TreeView html="<div><p>Example</p></div>" />
    </div>
  );
}
```

## Demo

A demo application is included in the `src/demo` directory. You can run it using:

```
npm run dev
```

This will start the Vite development server, and you can view the demo in your browser.

## Testing

Tests for the `TreeView` component are located in the `tests` directory. You can run the tests using:

```
npm run test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
