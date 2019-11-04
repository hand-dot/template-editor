import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Template } from './types';

const unityInstance = window.globalThis.UnityLoader.instantiate(
  'gameContainer',
  'Build/WebGL-Dist.json',
  { onProgress: window.globalThis.UnityProgress }
);

const getInitialTemplateData = (): Template => ({
  name: 'test',
  image: null,
  size: {
    width: 510,
    height: 197,
  },
  fontName: 'NotoSansCJKjp',
  fields: [],
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
        console.log('=============fromUnity================');
        console.log(json);
        console.log('=============fromUnity================');
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
    console.log('--------------toUnity----------------');
    console.log(data);
    console.log('--------------toUnity----------------');
    unityInstance.SendMessage('Canvas', 'ChangeTemplate', JSON.stringify(data));
  };
  render() {
    const { templateData } = this.state;
    return (
      <App
        templateData={templateData}
        onChangeTemplate={this.onChangeTemplate}
      />
    );
  }
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
