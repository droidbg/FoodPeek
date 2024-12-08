import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const helloWorld = <p>Hello World</p>; //JSX
// Babel will transpile JSX(  <p>Hello World</p>; ) into
// react element (React.createElement('p', {},"Hello World" ))

root.render(helloWorld);

// React, root will take the react element and it will render it and convert
// it to HTML element and put it in root div in index.html
