import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Template, TextField } from './types';

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

const getInitialTextFieldData = (): TextField => ({
  id: uuid(),
  name: '',
  sampleData: '',
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: 0,
    height: 0,
  },
  type: 'text',
  style: {
    alignment: 'left',
    fontSize: 18,
    characterSpacing: 0,
    lineHeight: 0,
  },
});

interface Props {}
interface State {
  templateData: Template;
}

class AppContainer extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const self = this;
    window.WebInteraction = {
      onInit() {
        self.onChangeTemplate(getInitialTemplateData(), 'template');
      },
      onChangeTemplate: json => {
        this.setState({ templateData: JSON.parse(json) });
      },
    };
  }
  state = {
    templateData: getInitialTemplateData(),
  };
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
    // FIXME 本当は下記のメソッドは不要
    // window.WebInteraction.onChangeTemplate にStateの更新を委託するが今は処理がないので必要
    const { templateData } = this.state;
    templateData.fields = templateData.fields.concat(getInitialTextFieldData());
    this.setState({ templateData });
  }
  render() {
    const { templateData } = this.state;
    return (
      <App
        templateData={templateData}
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
