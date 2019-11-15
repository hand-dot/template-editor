import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { arrayMove } from 'react-sortable-hoc';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Field, FieldUiState, Template } from './types';

const unityInstance = window.globalThis.UnityLoader.instantiate(
  'gameContainer',
  'Build/WebGL-Dist.json',
  { onProgress: window.globalThis.UnityProgress }
);

const getInitialTemplateData = (): Template => ({
  name: 'test',
  image: null,
  size: {
    width: 210,
    height: 297,
  },
  fontName: 'NotoSansCJKjp',
  fields: [],
});

interface Props {}
interface State {
  templateData: Template;
  fieldsUiStates: FieldUiState[];
}

class AppContainer extends Component<Props, State> {
  state = {
    templateData: getInitialTemplateData(),
    fieldsUiStates: [],
  };
  constructor(props: any) {
    super(props);
    window.WebInteraction = {
      onInit: () => {
        this.onChangeTemplate(getInitialTemplateData(), 'template');
      },
      onChangeTemplate: json => {
        const templateData = JSON.parse(json);
        this.setState({
          templateData,
          fieldsUiStates: templateData.fields.map((f: Field, i: number) => {
            const fieldUiState: FieldUiState = this.state.fieldsUiStates.find(
              (s: FieldUiState) => s.id === f.id
            )!;
            const expand = fieldUiState ? fieldUiState.expand : true;
            return { id: f.id, expand };
          }),
        });
      },
    };
  }

  onChangeTemplate(value: any, key: string) {
    const data =
      key === 'template'
        ? value
        : { ...this.state.templateData, ...{ [key]: value } };

    unityInstance.SendMessage('Canvas', 'ChangeTemplate', JSON.stringify(data));
  }

  onChangeField(field: Field) {
    unityInstance.SendMessage('Canvas', 'FieldChange', JSON.stringify(field));
  }

  onAddField() {
    unityInstance.SendMessage('Canvas', 'FieldAdd', '');
  }

  onRemoveField(id: string) {
    unityInstance.SendMessage('Canvas', 'FieldRemove', id);
  }

  handleExpand(id: string) {
    const { fieldsUiStates } = this.state;
    const target: any = fieldsUiStates.find((f: FieldUiState) => f.id === id);
    if (!target) {
      return;
    }
    target.expand = !target.expand;
    this.setState({ fieldsUiStates });
  }
  onSortEndField({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    this.onChangeTemplate(
      arrayMove(this.state.templateData.fields, oldIndex, newIndex),
      'fields'
    );
  }

  onDownload() {
    const blob = new Blob([JSON.stringify(this.state.templateData)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.state.templateData.name || 'notitle'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  }

  render() {
    const { templateData, fieldsUiStates } = this.state;
    return (
      <App
        templateData={templateData}
        fieldsUiStates={fieldsUiStates}
        handleExpand={this.handleExpand.bind(this)}
        onDownload={this.onDownload.bind(this)}
        onSortEndField={this.onSortEndField.bind(this)}
        onAddField={this.onAddField.bind(this)}
        onRemoveField={this.onRemoveField.bind(this)}
        onChangeField={this.onChangeField.bind(this)}
        onChangeTemplate={this.onChangeTemplate.bind(this)}
      />
    );
  }
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
