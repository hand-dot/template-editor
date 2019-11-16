import React, { Component } from 'react';

import { FieldUiState, Template } from '../types';

import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { sidebarWidth } from './style';

interface Props {
  templateData: Template;
  fieldsUiStates: FieldUiState[];
  onChangeTemplate: any;
  onChangeField: any;
  onAddField: any;
  onRemoveField: any;
  handleExpand: any;
  onSortEndField: any;
  onDownload: any;
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
      onDownload,
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
          onDownload={onDownload}
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
