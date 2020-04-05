import React from 'react';
import logo from './logo.svg';
import './App.css';

import scheme from './scheme.svg';
import PollingTime from './polling_time.js';

class Main extends React.Component 
{
  render()
  {
    document.onreadystatechange = () =>
    {
      if (document.readyState === 'complete') 
      {
        var doc = document.getElementById('svgObject').contentDocument;
      }
    }
    return (
      <div>
        <PollingTime/>
        <object id="svgObject" data={scheme} type="image/svg+xml" width="120%" height="100%" style={{border: "1px solid black", backgroundColor:"white", marginLeft:"15px", marginTop:"10px"}}>
                      Your browser doesn't support SVG
        </object>
      </div>
    );
  }
}

export default Main;
