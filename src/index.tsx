import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const unityInstance = window.globalThis.UnityLoader.instantiate(
  'gameContainer',
  'Build/WebGL-Dist.json',
  { onProgress: window.globalThis.UnityProgress }
);

const getInitialTemplateData = () => ({
  templateName: 'test',
  image: null,
  pageSize: {
    width: 510,
    height: 197,
  },
  fontName: 'NotoSansCJKjp',
  fields: [],
});

const onChangeTemplate = (value: any, key: string) => {
  let data = {};
  if (key === 'template') {
    data = value;
  } else {
    data = { ...value, ...{ [key]: value } };
  }
  console.log('--------------toUnity----------------');
  console.log(data);
  console.log('--------------toUnity----------------');
  unityInstance.SendMessage('Canvas', 'ChangeTemplate', JSON.stringify(data));
};

class AppContainer extends Component {
  constructor(props: any) {
    super(props);
    window.WebInteraction = {
      onInit() {
        onChangeTemplate(getInitialTemplateData(), 'template');
      },
      onChangeTemplate: json => {
        console.log('=============fromUnity================');
        console.log(json);
        console.log('=============fromUnity================');
        this.setState({ templateData: JSON.parse(json) });
      },
    };
  }
  state = { templateData: getInitialTemplateData() };
  render() {
    const { templateData } = this.state;
    return (
      <App templateData={templateData} onChangeTemplate={onChangeTemplate} />
    );
  }
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
