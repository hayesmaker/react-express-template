import React, { Component } from 'react';
import './Polaroid.css';

class Polaroid extends Component {
  render() {
    return (
      <div id="modal-container">
        <div className="modal-background">
          <div className="modal">
            <canvas id="result" />
            <p>TOP SECRET</p>
            <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
              <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>

      /*
      <div className="polaroid">
        <span>TOP SECRET</span>

      </div>
      */
    );
  }
}

export default Polaroid;