import React, { Component } from "react";
import "./App.css";
/*

      var gameInstance = UnityLoader.instantiate("gameContainer", "Build/public.json", {onProgress: UnityProgress});

      console.log(gameInstance);
<div class="webgl-content">
</div>

*/

class App extends Component {
  componentDidMount() {
    var gameInstance = window.UnityLoader.instantiate(
      "gameContainer",
      "Build/public.json",
      { onProgress: window.UnityProgress }
    );

    console.log(gameInstance);
  }
  render() {
    return (
      //returnの中にJSXを記載
      <div className="webgl-content">
        <div
          id="gameContainer"
          style={{ width: "1280px", height: "720px" }}
        ></div>
      </div>
    );
  }
}

export default App;
