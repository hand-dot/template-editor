import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Field from './Field';
import { sidebarStyle } from './style';
import { Field as FieldType, FieldUiState } from '../types';

const SortableItem = SortableElement(
  ({
    field,
    fieldsUiState,
    onChangeField,
    onRemoveField,
    handleExpand,
  }: {
    field: FieldType;
    fieldsUiState: FieldUiState;
    onChangeField: any;
    onRemoveField: any;
    handleExpand: any;
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
    fields,
    fieldsUiStates,
    onChangeField,
    onRemoveField,
    handleExpand,
  }: {
    fields: FieldType[];
    fieldsUiStates: FieldUiState[];
    onChangeField: any;
    onRemoveField: any;
    handleExpand: any;
  }) => {
    return (
      <div>
        {fields.map((field: FieldType, index: number) => (
          <SortableItem
            key={field.id}
            index={index}
            field={field}
            fieldsUiState={fieldsUiStates.find(f => f.id === field.id)!}
            onChangeField={onChangeField}
            onRemoveField={onRemoveField}
            handleExpand={handleExpand}
          />
        ))}
      </div>
    );
  }
);

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
  return (
    <div style={sidebarStyle({ right: 0, overflowY: 'scroll' })}>
      <SortableList
        fields={fields}
        fieldsUiStates={fieldsUiStates}
        useDragHandle={true}
        axis="y"
        lockAxis="y"
        onSortEnd={onSortEndField}
        onChangeField={onChangeField}
        onRemoveField={onRemoveField}
        handleExpand={handleExpand}
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
