import React from 'react';
import logo from './logo.svg';
import './App.css';

import scheme from './scheme.svg';
import PollingTime from './polling_time.js';
import Line44 from './line44.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fontSize: 17};
  }

  render() {
    document.onreadystatechange = async () => {
      if (document.readyState === 'complete') {
        var doc = document.getElementById('svgObject').contentDocument;
        doc.doClickAction = (signal_id) => {
          console.log(signal_id);
          this.setState({fontSize: 27});
        }
      }



     
    }
    return (
      <div>
        {/* <PollingTime /> */}

        {/* <button style={{
          position: "absolute",
          boxShadow: "1.5px 1.5px",
          border: "none",
          marginTop: "41%",
          marginLeft: "10%",
          fontWeight: "800",
          height: "9%",
          fontSize: 17
        }}>Выход <br />на <br />сит. план {this.state.fontSize}</button> */}

        <object id="svgObject" data={scheme} type="image/svg+xml" width="100%" height="100%" style={{ border: "1px solid black", backgroundColor: "white", marginLeft: "15px", marginTop: "10px" }}>
          Your browser doesn't support SVG
        </object>
      </div>
    );
  }
}

export default Main;
