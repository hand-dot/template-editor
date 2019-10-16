import React, { Component } from "react";
import "./App.css";

// TODO 下記のデータをLeftSidebar,RightSidebarに入れて動的にしていく

const templateData = {
  templateName: "年賀はがき",
  image: null,
  pageSize: {
    width: 100,
    height: 148
  },
  fontName: "NotoSansCJKjp",
  // これはまだアイデアだが、fontUriを持ってもいいかもしれない
  // "fontUri": "https://labelmake3.firebaseapp.com/pdfmake/vfs_fonts.js"
  fields: [
    {
      id: "uuid-hogehoge1234",
      fieldName: "[お届け先]郵便番号",
      sampleData: "1234567",
      position: {
        x: 45,
        y: 10
      },
      size: {
        width: 50,
        height: 100
      },
      type: "text",
      alignment: "left",
      fontSize: 22.9,
      characterSpacing: 7.4,
      lineHeight: 1
    },
    {
      id: "uuid-hogehoge1235",
      fieldName: "[お届け先]住所1",
      sampleData: "東京都東京1|2|3|4",
      position: {
        x: 90,
        y: 30
      },
      size: {
        width: 0,
        height: 100
      },
      type: "text",
      alignment: "center",
      fontSize: 9.2,
      characterSpacing: 0,
      lineHeight: 1
    },
    {
      id: "uuid-hogehoge1236",
      fieldName: "[お届け先]住所2",
      sampleData: "東京マンション123号",
      position: {
        x: 83,
        y: 35
      },
      size: {
        width: 0,
        height: 100
      },
      type: "text",
      alignment: "center",
      fontSize: 9.2,
      characterSpacing: 0,
      lineHeight: 1
    },
    {
      id: "uuid-hogehoge1237",
      fieldName: "[お届け先]氏名",
      sampleData: "東京都 出得太 様",
      position: {
        x: 50,
        y: 25
      },
      size: {
        width: 0,
        height: 100
      },
      type: "text",
      alignment: "left",
      fontSize: 20,
      characterSpacing: 0,
      lineHeight: 1
    },
    {
      id: "uuid-hogehoge1238",
      fieldName: "[差出人]郵便番号",
      sampleData: "7654321",
      position: {
        x: 6.3,
        y: 121.5
      },
      size: {
        width: 50,
        height: 100
      },
      type: "text",
      alignment: "left",
      fontSize: 14.8,
      characterSpacing: 3.6,
      lineHeight: 0
    },
    {
      id: "uuid-hogehoge1239",
      fieldName: "[差出人]住所1",
      sampleData: "大阪府大阪1|2|3|4",
      position: {
        x: 29,
        y: 50
      },
      size: {
        width: 0,
        height: 100
      },
      type: "text",
      alignment: "center",
      fontSize: 7,
      characterSpacing: 0,
      lineHeight: 1
    },
    {
      id: "uuid-hogehoge1220",
      fieldName: "[差出人]住所2",
      sampleData: "大阪マンション123号",
      position: {
        x: 25,
        y: 60
      },
      size: {
        width: 0,
        height: 100
      },
      type: "text",
      alignment: "center",
      fontSize: 7,
      characterSpacing: 0,
      lineHeight: 1
    },
    {
      id: "uuid-hogehoge1221",
      fieldName: "[差出人]氏名",
      sampleData: "大阪府 出得太",
      position: {
        x: 12,
        y: 57
      },
      size: {
        width: 0,
        height: 100
      },
      type: "text",
      alignment: "left",
      fontSize: 15,
      characterSpacing: 0,
      lineHeight: 1
    }
  ]
};

const sidebarStyle = (option: any) =>
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

const Panel = ({ head, children }: any) =>
  PanelWithAction({ head, action: null, children });

const PanelWithAction = ({ head, action, children }: any) => (
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
        <input type="number" style={miniInputStyle()}></input>
      </div>
      <div>
        <label>W:</label>
        <input type="number" style={miniInputStyle()}></input>
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

const FieldName = () => (
  <PanelWithAction head="FieldName" action={<FieldActions></FieldActions>}>
    <input style={inputStyle()}></input>
  </PanelWithAction>
);

const FieldPositionAndSize = () => (
  <Panel head="Position&Size">
    <div>
      <label>X:</label>
      <input type="number" style={miniInputStyle()}></input>
      <label>H:</label>
      <input type="number" style={miniInputStyle()}></input>
    </div>
    <div>
      <label>Y:</label>
      <input type="number" style={miniInputStyle()}></input>
      <label>W:</label>
      <input type="number" style={miniInputStyle()}></input>
    </div>
  </Panel>
);

const FieldType = () => (
  <Panel head="Type">
    <div>
      <select>
        <option>Text</option>
        <option>Image</option>
      </select>
    </div>
  </Panel>
);

const TextMeta = () => (
  <>
    <Panel head="FontSize(pt)">
      <input type="number" style={miniInputStyle()}></input>
    </Panel>
    <Panel head="LineHeight(em)">
      <input type="number" style={miniInputStyle()}></input>
    </Panel>
    <Panel head="Alignment">
      <select>
        <option>Left</option>
        <option>Center</option>
        <option>Right</option>
      </select>
    </Panel>
  </>
);

const FieldSampleData = () => (
  <Panel head="SampleData">
    <input style={inputStyle()}></input>
  </Panel>
);

const Field = () => (
  <>
    <FieldName></FieldName>
    <FieldPositionAndSize></FieldPositionAndSize>
    <FieldType></FieldType>
    <TextMeta></TextMeta>
    <FieldSampleData></FieldSampleData>
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
    var gameInstance: any = (globalThis as any).UnityLoader.instantiate(
      "gameContainer",
      "Build/public.json",
      { onProgress: (globalThis as any).UnityProgress }
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
