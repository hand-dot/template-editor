import React from 'react';
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
    width: 210,
    height: 297,
  },
  fontName: 'NotoSansCJKjp',
  fields: [],
});

let templateData = getInitialTemplateData();

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

window.WebInteraction = {
  onInit() {
    onChangeTemplate(getInitialTemplateData(), 'template');
  },
  onChangeTemplate: json => {
    console.log('=============fromUnity================');
    console.log(json);
    console.log('=============fromUnity================');
    templateData = JSON.parse(json);
  },
};

ReactDOM.render(
  <App
    unityInstance={unityInstance}
    templateData={templateData} // FIXME templateData = JSON.parse(json);　で値を変更しても変わらない
    onChangeTemplate={onChangeTemplate}
  ></App>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
