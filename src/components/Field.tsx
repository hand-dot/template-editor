import React from 'react';
import set from 'lodash.set';
import { SortableHandle } from 'react-sortable-hoc';
import Panel from './Panel';
import { inputStyle, miniInputStyle } from './style';
import { Field, FieldUiState, isTextField } from '../types';

const DragHandle = SortableHandle(() => (
  <span role="img" aria-label="grab">
    🖐
  </span>
));

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
  <div style={{ fontSize: 'small' }}>
    <span role="img" aria-label="actions">
      🔴
    </span>
    <button
      onClick={() => {
        handleExpand(id);
      }}
    >
      <span role="img" aria-label="actions">
        {expand ? '🔼' : '🔽'}
      </span>
    </button>
    <DragHandle />
    <button
      onClick={() => {
        onRemoveField(id);
      }}
    >
      <span role="img" aria-label="actions">
        🗑
      </span>
    </button>
  </div>
);

export default ({
  field,
  fieldsUiState,
  handleExpand,
  onRemoveField,
  onChangeField,
}: {
  field: Field;
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
      <Panel
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
      </Panel>
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
            <textarea
              rows={3}
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
