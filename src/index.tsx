import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    const self = this;
    window.WebInteraction = {
      onInit() {
        self.onChangeTemplate(getInitialTemplateData(), 'template');
      },
      onChangeTemplate: json => {
        const templateData = JSON.parse(json);
        this.setState({
          templateData,
          fieldsUiStates: templateData.fields.map((f: Field, i: number) => ({
            id: f.id,
            order: i,
            expand: false,
          })),
        });
      },
    };
  }
  onChangeTemplate = (value: any, key: string) => {
    let data = {};
    if (key === 'template') {
      data = value;
    } else {
      data = { ...this.state.templateData, ...{ [key]: value } };
    }
    unityInstance.SendMessage('Canvas', 'ChangeTemplate', JSON.stringify(data));
  };
  onAddField() {
    unityInstance.SendMessage('Canvas', 'FieldAdd', '');
  }
  handleExpand(id: string) {
    const { fieldsUiStates } = this.state;
    const target: any = fieldsUiStates.find((f: FieldUiState) => f.id === id);
    if (!target) return;
    target.expand = !target.expand;
    this.setState({ fieldsUiStates });
  }
  render() {
    const { templateData, fieldsUiStates } = this.state;
    return (
      <App
        handleExpand={this.handleExpand.bind(this)}
        templateData={templateData}
        fieldsUiStates={fieldsUiStates}
        onAddField={this.onAddField.bind(this)}
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
