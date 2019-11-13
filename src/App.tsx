import React, { Component } from 'react';
import './App.css';
import {
  Field as FieldType,
  FieldUiState,
  isTextField,
  Template,
} from './types';

const sidebarWidth = 200;

const sidebarStyle = (option: any) => ({
  ...option,
  position: 'absolute',
  zIndex: 1,
  width: sidebarWidth,
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
        fontSize: 'small',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        background: '#333',
        margin: 0,
        padding: 3,
        borderBottom: '1px solid #000',
      }}
    >
      {head}
      {action && action}
    </div>
    <div style={{ padding: 3, backgroundColor: '#888' }}>{children}</div>
  </div>
);

const LeftSidebar = ({
  onChangeTemplate,
  name,
  image,
  size,
  fontName,
}: any) => (
  <div style={sidebarStyle({ left: 0 })}>
    <Panel head="Template Name">
      <input
        style={inputStyle()}
        value={name}
        onChange={e => onChangeTemplate(e.target.value, 'name')}
      />
    </Panel>
    <Panel head="Size">
      <div>
        <label>H:</label>
        <input
          type="number"
          style={miniInputStyle()}
          value={size.height}
          onChange={e => {
            onChangeTemplate(
              Object.assign(size, { height: +e.target.value }),
              'size'
            );
          }}
        />
      </div>
      <div>
        <label>W:</label>
        <input
          type="number"
          style={miniInputStyle()}
          value={size.width}
          onChange={e => {
            onChangeTemplate(
              Object.assign(size, { width: +e.target.value }),
              'size'
            );
          }}
        />
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
      <div style={{ display: 'inline-flex', marginBottom: 10 }}>
        <input
          style={{ width: '90%' }}
          type="file"
          accept="image/*"
          onChange={event => {
            const files = event.target.files;
            const fileReader = new FileReader();
            fileReader.addEventListener('load', e => {
              if (e.target) onChangeTemplate(e.target.result, 'image');
            });
            if (files && files[0]) fileReader.readAsDataURL(files[0]);
          }}
        />
        <button onClick={() => onChangeTemplate('', 'image')}>X</button>
      </div>
      <button style={{ display: 'block' }}>Import Template</button>
    </Panel>
  </div>
);

const FieldActions = ({
  handleExpand,
  onRemoveField,
  expand,
  id,
}: {
  handleExpand: any;
  onRemoveField: any;
  expand: boolean;
  id: string;
}) => (
  <div style={{ fontSize: 'small' }} role="img" aria-label="actions">
    🔴
    <button
      onClick={() => {
        handleExpand(id);
      }}
    >
      {expand ? '🔼' : '🔽'}
    </button>
    🖐🏻
    <button
      onClick={() => {
        onRemoveField(id);
      }}
    >
      🗑
    </button>
  </div>
);

const Field = ({
  field,
  fieldsUiState,
  handleExpand,
  onRemoveField,
}: {
  field: FieldType;
  fieldsUiState: FieldUiState;
  handleExpand: any;
  onRemoveField: any;
}) => {
  const { id, name, position, size, type, sampleData } = field;
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <PanelWithAction
        head="FieldName"
        action={
          <FieldActions
            id={id}
            expand={fieldsUiState.expand}
            handleExpand={handleExpand}
            onRemoveField={onRemoveField}
          />
        }
      >
        <input style={inputStyle()} value={name} />
      </PanelWithAction>
      {fieldsUiState && fieldsUiState.expand ? (
        <>
          <Panel head="Position&Size">
            <div>
              <label>X:</label>
              <input
                type="number"
                style={miniInputStyle()}
                value={position.x}
              />
              <label>H:</label>
              <input
                type="number"
                style={miniInputStyle()}
                value={size.height}
              />
            </div>
            <div>
              <label>Y:</label>
              <input
                type="number"
                style={miniInputStyle()}
                value={position.y}
              />
              <label>W:</label>
              <input
                type="number"
                style={miniInputStyle()}
                value={size.width}
              />
            </div>
          </Panel>
          <Panel head="Type">
            <div>
              <select value={type}>
                <option>Text</option>
                <option>Image</option>
              </select>
            </div>
          </Panel>
          {isTextField(field) && (
            <>
              <Panel head="FontSize(pt)">
                <input
                  type="number"
                  style={miniInputStyle()}
                  value={field.style.fontSize}
                />
              </Panel>
              <Panel head="Alignment">
                <select value={field.style.alignment}>
                  <option>Left</option>
                  <option>Center</option>
                  <option>Right</option>
                </select>
              </Panel>
              <Panel head="CharacterSpacing">
                <input
                  type="number"
                  style={miniInputStyle()}
                  value={field.style.characterSpacing}
                />
              </Panel>
              <Panel head="LineHeight(em)">
                <input
                  type="number"
                  style={miniInputStyle()}
                  value={field.style.lineHeight}
                />
              </Panel>
            </>
          )}
          <Panel head="SampleData">
            <input style={inputStyle()} value={sampleData} />
          </Panel>
        </>
      ) : null}
    </div>
  );
};

const RightSidebar = ({
  fields,
  fieldsUiStates,
  onAddField,
  onRemoveField,
  handleExpand,
}: {
  fields: FieldType[];
  fieldsUiStates: FieldUiState[];
  onAddField: any;
  onRemoveField: any;
  handleExpand: any;
}) => (
  <div style={sidebarStyle({ right: 0, overflowY: 'scroll' })}>
    {fields.map(field => (
      <Field
        key={field.id}
        field={field}
        fieldsUiState={fieldsUiStates.find(f => f.id === field.id)!}
        onRemoveField={onRemoveField}
        handleExpand={handleExpand}
      />
    ))}
    <button
      style={{ display: 'block', margin: '10px auto' }}
      onClick={onAddField}
    >
      Add New Field
    </button>
  </div>
);

interface Props {
  templateData: Template;
  fieldsUiStates: FieldUiState[];
  onChangeTemplate: any;
  onAddField: any;
  onRemoveField: any;
  handleExpand: any;
}
interface State {}
class App extends Component<Props, State> {
  render() {
    const {
      onChangeTemplate,
      templateData,
      fieldsUiStates,
      onAddField,
      onRemoveField,
      handleExpand,
    } = this.props;
    const { fields, name, image, size, fontName } = templateData;
    return (
      <>
        <LeftSidebar
          name={name}
          image={image}
          size={size}
          fontName={fontName}
          onChangeTemplate={onChangeTemplate}
        />
        <div
          id="gameContainer"
          style={{
            position: 'absolute',
            zIndex: 0,
            left: sidebarWidth,
            width: window.innerWidth - sidebarWidth * 2,
            height: window.innerHeight,
          }}
        />
        <RightSidebar
          fields={fields}
          fieldsUiStates={fieldsUiStates}
          onAddField={onAddField}
          onRemoveField={onRemoveField}
          handleExpand={handleExpand}
        />
      </>
    );
  }
}

export default App;
