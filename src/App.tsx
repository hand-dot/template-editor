import React, { Component } from 'react';
import './App.css';

const sidebarStyle = (option: any) => ({
  ...option,
  position: 'absolute',
  zIndex: 1,
  width: 240,
  height: window.innerHeight,
  backgroundColor: '#444',
});

const inputStyle = () => ({
  border: '1px solid rgb(0, 0, 0)',
  marginBottom: 1,
  color: '#000',
});

const miniInputStyle = () => ({ maxWidth: 50, ...inputStyle() });

const Panel = ({ head, children }: any) =>
  PanelWithAction({ head, action: null, children });

const PanelWithAction = ({ head, action, children }: any) => (
  <div style={{ border: '1px solid #000', marginBottom: 1, color: '#fff' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        background: '#333',
        margin: 0,
        padding: 10,
        borderBottom: '1px solid #000',
      }}
    >
      {head}
      {action && action}
    </div>
    <div style={{ padding: 10, backgroundColor: '#888' }}>{children}</div>
  </div>
);

const LeftSidebar = ({
  onChangeTemplate,
  templateName,
  image,
  pageSize,
  fontName,
}: any) => (
  <div style={sidebarStyle({ left: 0 })}>
    <Panel head="Template Name">
      <input
        style={inputStyle()}
        value={templateName}
        onChange={e => {
          const value = e.target.value;
          onChangeTemplate(value, 'templateName');
        }}
      />
    </Panel>
    <Panel head="Size">
      <div>
        <label>H:</label>
        <input type="number" style={miniInputStyle()} />
      </div>
      <div>
        <label>W:</label>
        <input type="number" style={miniInputStyle()} />
      </div>
    </Panel>
    <Panel head="Font">
      <select>
        <option>Serif</option>
        <option>Sans-serif</option>
      </select>
    </Panel>
    <Panel head="Action">
      <button style={{ display: 'block', marginBottom: 10 }}>
        Dowload Template
      </button>
      <button style={{ display: 'block', marginBottom: 10 }}>
        Import Image
      </button>
      <button style={{ display: 'block' }}>Import Template</button>
    </Panel>
  </div>
);

const FieldActions = () => (
  <span style={{ fontSize: 'small' }} role="img" aria-label="actions">
    🔴 🔽 🖐🏻 🗑
  </span>
);

const FieldName = () => (
  <PanelWithAction head="FieldName" action={<FieldActions />}>
    <input style={inputStyle()} />
  </PanelWithAction>
);

const FieldPositionAndSize = () => (
  <Panel head="Position&Size">
    <div>
      <label>X:</label>
      <input type="number" style={miniInputStyle()} />
      <label>H:</label>
      <input type="number" style={miniInputStyle()} />
    </div>
    <div>
      <label>Y:</label>
      <input type="number" style={miniInputStyle()} />
      <label>W:</label>
      <input type="number" style={miniInputStyle()} />
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
      <input type="number" style={miniInputStyle()} />
    </Panel>
    <Panel head="LineHeight(em)">
      <input type="number" style={miniInputStyle()} />
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
    <input style={inputStyle()} />
  </Panel>
);

const Field = () => (
  <>
    <FieldName />
    <FieldPositionAndSize />
    <FieldType />
    <TextMeta />
    <FieldSampleData />
  </>
);

const RightSidebar = () => (
  <div style={sidebarStyle({ right: 0 })}>
    <Field />
    <button style={{ display: 'block', margin: '10px auto' }}>
      Add New Field
    </button>
  </div>
);

interface Props {
  unityInstance: any;
  templateData: any;
  onChangeTemplate: any;
}
interface State {}
class App extends Component<Props, State> {
  componentDidMount() {
    console.log(this.props.unityInstance, 'componentDidMount');
  }
  componentDidUpdate() {
    console.log(this.props.templateData, 'componentDidUpdate');
  }
  render() {
    const { onChangeTemplate, templateData } = this.props;
    const { fields, templateName, image, pageSize, fontName } = templateData;
    return (
      <>
        <LeftSidebar
          templateName={templateName}
          image={image}
          pageSize={pageSize}
          fontName={fontName}
          onChangeTemplate={onChangeTemplate}
        />
        {/* MEMO: 下記の要素にイベントが取られて正常にイベントハンドラできない */}
        {/* FIXME: onChangeTemplateを動かす */}
        <div
          id="gameContainer"
          style={{
            position: 'absolute',
            zIndex: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        />
        <RightSidebar />
      </>
    );
  }
}

export default App;
