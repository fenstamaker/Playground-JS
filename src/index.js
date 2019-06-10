import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import css from "./index.css";

import Canvas from "./Canvas";
import Renderer from "./Renderer";

class App extends React.Component {
  render() {
    return (
      <div>
        <Renderer />
      </div>
    );
  }
}

const root = document.createElement("div");
root.setAttribute("id", "app");
document.body.appendChild(root);

ReactDOM.render(<App />, document.getElementById("app"));
