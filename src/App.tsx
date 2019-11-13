import React, { Component } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import set from 'lodash.set';
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

const DragHandle = SortableHandle(() => <span>🖐</span>);

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
    <DragHandle />
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
  onChangeField,
}: {
  field: FieldType;
  fieldsUiState: FieldUiState;
  handleExpand: any;
  onRemoveField: any;
  onChangeField: any;
}) => {
  const { id, name, position, size, type, sampleData } = field;
  const _onChangeField = (e: any) => {
    const fieldCopy = JSON.parse(JSON.stringify(field));
    const path = e.currentTarget.name;
    const value =
      e.currentTarget.type === 'number' ? +e.target.value : e.target.value;
    set(fieldCopy, path, value);
    onChangeField(fieldCopy);
  };
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
        <input
          style={inputStyle()}
          onChange={_onChangeField}
          value={name}
          name="name"
        />
      </PanelWithAction>
      {fieldsUiState && fieldsUiState.expand ? (
        <>
          <Panel head="Position&Size">
            <div>
              <label>X:</label>
              <input
                type="number"
                style={miniInputStyle()}
                name="position.x"
                onChange={_onChangeField}
                value={position.x}
              />
              <label>H:</label>
              <input
                type="number"
                style={miniInputStyle()}
                name="size.height"
                onChange={_onChangeField}
                value={size.height}
              />
            </div>
            <div>
              <label>Y:</label>
              <input
                type="number"
                style={miniInputStyle()}
                name="position.y"
                onChange={_onChangeField}
                value={position.y}
              />
              <label>W:</label>
              <input
                type="number"
                style={miniInputStyle()}
                name="size.width"
                onChange={_onChangeField}
                value={size.width}
              />
            </div>
          </Panel>
          <Panel head="Type">
            <div>
              <select name="type" onChange={_onChangeField} value={type}>
                <option value="text">Text</option>
                <option value="image">Image</option>
              </select>
            </div>
          </Panel>
          {isTextField(field) && (
            <>
              <Panel head="FontSize(pt)">
                <input
                  type="number"
                  style={miniInputStyle()}
                  name="field.style.fontSize"
                  onChange={_onChangeField}
                  value={field.style.fontSize}
                />
              </Panel>
              <Panel head="Alignment">
                <select
                  name="field.style.alignment"
                  onChange={_onChangeField}
                  value={field.style.alignment}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </Panel>
              <Panel head="CharacterSpacing">
                <input
                  type="number"
                  style={miniInputStyle()}
                  name="field.style.characterSpacing"
                  onChange={_onChangeField}
                  value={field.style.characterSpacing}
                />
              </Panel>
              <Panel head="LineHeight(em)">
                <input
                  type="number"
                  style={miniInputStyle()}
                  name="field.style.lineHeight"
                  onChange={_onChangeField}
                  value={field.style.lineHeight}
                />
              </Panel>
            </>
          )}
          <Panel head="SampleData">
            <input
              style={inputStyle()}
              name="sampleData"
              onChange={_onChangeField}
              value={sampleData}
            />
          </Panel>
        </>
      ) : null}
    </div>
  );
};

const RightSidebar = ({
  fields,
  fieldsUiStates,
  onChangeField,
  onAddField,
  onRemoveField,
  handleExpand,
  onSortEndField,
}: {
  fields: FieldType[];
  fieldsUiStates: FieldUiState[];
  onChangeField: any;
  onAddField: any;
  onRemoveField: any;
  handleExpand: any;
  onSortEndField: any;
}) => {
  const SortableItem = SortableElement(
    ({
      field,
      fieldsUiState,
    }: {
      field: FieldType;
      fieldsUiState: FieldUiState;
    }) => (
      <Field
        field={field}
        fieldsUiState={fieldsUiState}
        onRemoveField={onRemoveField}
        onChangeField={onChangeField}
        handleExpand={handleExpand}
      />
    )
  );

  const SortableList = SortableContainer(
    ({
      _fields,
      _fieldsUiStates,
    }: {
      _fields: FieldType[];
      _fieldsUiStates: FieldUiState[];
    }) => {
      return (
        <div>
          {_fields.map((field: FieldType, index: number) => (
            <SortableItem
              key={field.id}
              index={index}
              field={field}
              fieldsUiState={_fieldsUiStates.find(f => f.id === field.id)!}
            />
          ))}
        </div>
      );
    }
  );

  return (
    <div style={sidebarStyle({ right: 0, overflowY: 'scroll' })}>
      <SortableList
        _fields={fields}
        _fieldsUiStates={fieldsUiStates}
        useDragHandle={true}
        axis="y"
        lockAxis="y"
        onSortEnd={onSortEndField}
      />
      <button
        style={{ display: 'block', margin: '10px auto' }}
        onClick={onAddField}
      >
        Add New Field
      </button>
    </div>
  );
};

interface Props {
  templateData: Template;
  fieldsUiStates: FieldUiState[];
  onChangeTemplate: any;
  onChangeField: any;
  onAddField: any;
  onRemoveField: any;
  handleExpand: any;
  onSortEndField: any;
}
interface State {}
class App extends Component<Props, State> {
  render() {
    const {
      onChangeTemplate,
      onChangeField,
      templateData,
      fieldsUiStates,
      onAddField,
      onRemoveField,
      handleExpand,
      onSortEndField,
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
          onChangeField={onChangeField}
          handleExpand={handleExpand}
          onSortEndField={onSortEndField}
        />
      </>
    );
  }
}

export default App;
