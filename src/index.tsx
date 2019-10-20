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

let templateData = {};

// TODO
// Appコンポーネントに "unityInstance.SendMessage" するonChangeメソッドを渡して
// Unityにデータの変更をリクエストする

ReactDOM.render(
  <App unityInstance={unityInstance} templateData={templateData}></App>,
  document.getElementById('root')
);

window.WebInteraction = {
  onInit() {
    unityInstance.SendMessage(
      'Canvas',
      'ChangeTemplate',
      JSON.stringify({
        templateName: '',
        image: null,
        pageSize: {
          width: 210,
          height: 297,
        },
        fontName: 'NotoSansCJKjp',
        fields: [],
      })
    );
  },
  onChangeTemplate: json => {
    console.log('=============================');
    console.log(json);
    console.log('=============================');
    templateData = json;
  },
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
