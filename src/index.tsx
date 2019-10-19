import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

const unityInstance = window.globalThis.UnityLoader.instantiate(
  'gameContainer',
  'Build/WebGL-Dist.json',
  { onProgress: window.globalThis.UnityProgress }
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
  },
};
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
