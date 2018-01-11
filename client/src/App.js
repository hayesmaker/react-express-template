import React, {Component} from 'react';
import './App.css';
import Polaroid from "./Polaroid";

class App extends Component {
  /**
   * Articles component constructor
   * - Sets state and function binds
   *
   * @constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedEffects: [],
      allEffects: ['invert', 'red', 'green', 'blue']
    };
    let constraints = {
      audio: false,
      video: {width: 640, height: 480}
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(this.webcamConnected.bind(this))
      .catch(function error(error) {
        console.log(error);
      });
  }

  /**
   * @method webcamConnected
   * @param stream
   */
  webcamConnected(stream) {
    let video = document.querySelector('video');
    video.srcObject = stream;
    video.style.display = 'none';
    let feed = document.getElementById('feed');
    let display = document.getElementById('display');
    display.width = 640;
    display.height = 480;
    feed.width = 640;
    feed.height = 480;
    feed.style.display = 'none';
    let ctx = feed.getContext('2d');
    video.addEventListener('loadedmetadata', function () {
      ctx.translate(video.videoWidth, 0);
      ctx.scale(-1, 1);
    });
    this.streamLoop();
  }

  streamLoop() {
    let video = document.querySelector('video');
    let feed = document.getElementById('feed');
    let display = document.getElementById('display');
    let feedCtx = feed.getContext('2d');
    let displayCtx = display.getContext('2d');
    let imageData;
    requestAnimationFrame(this.streamLoop.bind(this));
    feedCtx.drawImage(video, 0, 0, feed.width, feed.height);
    imageData = feedCtx.getImageData(0, 0, feed.width, feed.height);
    imageData = this.applyEffects(imageData);
    displayCtx.putImageData(imageData, 0, 0);
    displayCtx.translate(video.videoWidth, 0);
    displayCtx.scale(-1, -1);
  }

  takePhoto() {
    let display = document.getElementById('display');
    this.cloneCanvas(display);
    let container = document.getElementById("modal-container");
    container.className = "one";
    let body = document.querySelector('body');
    body.className = 'modal-active';
    container.onclick = function () {
      container.className = "out";
      body.className = '';
      /*
      save photo
       */
      //let data = display.toDataURL("image/png");
      //data = data.replace("image/png","image/octet-stream");
      //document.location.href = data;
    };
    /*
    save photo to png
      */
  }

  /**
   * Finds the result element and clones a snapshot image
   * into it.
   *
   * @method cloneCanvas
   * @param oldCanvas
   * @returns {HTMLElement}
   */
  cloneCanvas(oldCanvas) {
    //create a new canvas
    let newCanvas = document.getElementById('result');
    let context = newCanvas.getContext('2d');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    context.drawImage(oldCanvas, 0, 0);
    return newCanvas;
  }



  /**
   * @method addEffect
   * @param e
   */
  addEffect(e) {
    let el = e.currentTarget;
    let classNameArr = e.currentTarget.className.split(' ');
    let effect = e.currentTarget.getAttribute('data-effect');
    console.log('classNameArr=', classNameArr);

    if (this.state.selectedEffects.indexOf(effect) > -1) {
      this.state.selectedEffects.splice(this.state.selectedEffects.indexOf(effect), 1);
      classNameArr.splice(classNameArr.indexOf('selected'), 1);
    } else {
      this.state.selectedEffects.push(effect);
      //e.currentTarget.addClass('selected');
      classNameArr.push('selected');
    }

    el.className = classNameArr.join(' ');
  }

  /**
   * @method applyEffects
   * @param imageData
   * @returns {*}
   */
  applyEffects(imageData) {
    let data = imageData.data;
    let type = {};
    let i, j;
    for (i = 0; i < this.state.selectedEffects.length; i++) {
      type = this.state.selectedEffects[i];
      for (j = 0; j < data.length; j += 4) {
        switch (type) {
          case "invert":
            // code to go here
            data[j] = 255 - data[j];
            data[j + 1] = 255 - data[j + 1]; // g
            data[j + 2] = 255 - data[j + 2]; // b
            break;
          case "red":
            // code to go here
            data[j] = Math.min(255, data[j] * 2); // r
            data[j + 1] = data[j + 1] / 2; // g
            data[j + 2] = data[j + 2] / 2; // b
            break;
          case "blue":
            data[j] = data[j + 1] / 2; // r
            data[j + 1] = data[j + 2] / 2; // g
            data[j + 2] = Math.min(255, data[j] * 2); // b
            break;
          case "green":
            data[j] = data[j + 1] / 2; // r
            data[j + 1] = Math.min(255, data[j] * 2); // g
            data[j + 2] = data[j + 2] / 2; // b
            break;

          default:
            break;

        }
      }
    }
    return imageData;
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4 className="title">Welcome to Andy Hayes' DevTask</h4>
        </div>
        <div className="row">
          <div className="controls">
            <button className="btn fourth" onClick={this.addEffect.bind(this)} data-effect="invert">Ghost</button>
            <button className="btn first" onClick={this.addEffect.bind(this)} data-effect="red">Red</button>
            <button className="btn second" onClick={this.addEffect.bind(this)} data-effect="green">Green</button>
            <button className="btn third" onClick={this.addEffect.bind(this)} data-effect="blue">Blue</button>
          </div>
        </div>

        <Polaroid/>

        <video id="video" autoPlay={true}></video>
        <canvas id="display"></canvas>
        <canvas id="feed"></canvas>


        <div className="row">
          <button className="btn sixth" onClick={this.takePhoto.bind(this)} id="shutter">Smile!
          </button>
        </div>
      </div>
    );
  }
}

export default App;
