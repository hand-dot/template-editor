import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Field from './Field';
import { sidebarStyle } from './style';
import { Field as FieldType, FieldUiState } from '../types';

export default ({
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
