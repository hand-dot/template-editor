import React, { Component } from "react";
import "./App.css";

const sidebarStyle = option =>
  Object.assign(option, {
    position: "absolute",
    zIndex: 1,
    width: 240,
    height: window.innerHeight,
    backgroundColor: "#444"
  });

const inputStyle = () => ({
  border: "1px solid rgb(0, 0, 0)",
  marginBottom: 1,
  color: "#fff"
});

const miniInputStyle = () => Object.assign({ maxWidth: 50 }, inputStyle());

const Panel = ({ head, children }) =>
  PanelWithAction({ head, action: null, children });

const PanelWithAction = ({ head, action, children }) => (
  <div style={{ border: "1px solid #000", marginBottom: 1, color: "#fff" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        background: "#333",
        margin: 0,
        padding: 10,
        borderBottom: "1px solid #000"
      }}
    >
      {head}
      {action && action}
    </div>
    <div style={{ padding: 10, backgroundColor: "#888" }}>{children}</div>
  </div>
);

const LeftSidebar = () => (
  <div style={sidebarStyle({ left: 0 })}>
    <Panel head="Template Name">
      <input style={inputStyle()}></input>
    </Panel>
    <Panel head="Size">
      <div>
        <label>H:</label>
        <input style={miniInputStyle()}></input>
      </div>
      <div>
        <label>W:</label>
        <input style={miniInputStyle()}></input>
      </div>
    </Panel>
    <Panel head="Font">
      <select>
        <option>Serif</option>
        <option>Sans-serif</option>
      </select>
    </Panel>
    <Panel head="Action">
      <button style={{ display: "block", marginBottom: 10 }}>
        Dowload Template
      </button>
      <button style={{ display: "block", marginBottom: 10 }}>
        Import Image
      </button>
      <button style={{ display: "block" }}>Import Template</button>
    </Panel>
  </div>
);

const FieldActions = () => (
  <span style={{ fontSize: "small" }} role="img" aria-label="actions">
    🔴 🔽 🖐🏻 🗑
  </span>
);

const Field = () => (
  <>
    <PanelWithAction head="FieldName" action={<FieldActions></FieldActions>}>
      <input style={inputStyle()}></input>
    </PanelWithAction>
    <Panel head="Position&Size">
      <div>
        <label>X:</label>
        <input style={miniInputStyle()}></input>
        <label>H:</label>
        <input style={miniInputStyle()}></input>
      </div>
      <div>
        <label>Y:</label>
        <input style={miniInputStyle()}></input>
        <label>W:</label>
        <input style={miniInputStyle()}></input>
      </div>
    </Panel>
    <Panel head="Type">
      <div>
        <select>
          <option>Text</option>
          <option>Image</option>
        </select>
      </div>
    </Panel>
    <Panel head="FontSize(pt)">
      <input style={inputStyle()}></input>
    </Panel>
    <Panel head="Alignment">
      <input style={inputStyle()}></input>
    </Panel>
    <Panel head="LineHeight(em)">
      <select>
        <option>Left</option>
        <option>Center</option>
        <option>Right</option>
      </select>
    </Panel>
    <Panel head="SampleData">
      <input style={inputStyle()}></input>
    </Panel>
  </>
);

const RightSidebar = () => (
  <div style={sidebarStyle({ right: 0 })}>
    <Field></Field>
    <button style={{ display: "block", margin: "10px auto" }}>
      Add New Field
    </button>
  </div>
);

class App extends Component {
  componentDidMount() {
    var gameInstance = window.UnityLoader.instantiate(
      "gameContainer",
      "Build/public.json",
      { onProgress: window.UnityProgress }
    );

    console.log(gameInstance);
  }
  render() {
    return (
      <>
        <LeftSidebar />
        <div
          id="gameContainer"
          style={{
            position: "absolute",
            zIndex: 0,
            width: window.innerWidth,
            height: window.innerHeight
          }}
        ></div>
        <RightSidebar />
      </>
    );
  }
}

export default App;
