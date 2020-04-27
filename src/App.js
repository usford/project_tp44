import React from 'react';
import logo from './logo.svg';
import './App.css';

import scheme from './scheme.svg';
import PollingTime from './polling_time.js';
import Line44 from './line44.js';

import Fullscreen from "react-full-screen";

import {changeRect} from './changeRect.js';

import {changeAllElements, changeElements}  from './default_settings.js';


//Подключение по вебсокету
function connectWs()
{
  const ws = new WebSocket('ws://localhost:8888');

  ws.onopen = () => 
  {
    console.log('connected WS');
  }

  ws.onmessage = evt => 
  {
    const message = JSON.parse(evt.data);

    console.log(message);

    var count = 1;
    for (var item of message.elements)
    {
      setTimeout(clickRect, count * 100, item);
      count += 1;
    }
  }

  ws.onclose = () => 
  {
    console.log('disconnected');
  }
}

//Замена ячеек на схеме
function replaceRect(id, oldID)
{
  var doc = document.getElementById('svgObject').contentDocument;

  var doc2 = document.getElementById('svgObject2').contentDocument;
  

  var selection = doc2.querySelector('g');
  

  if (!selection) return;


  var newElement = selection;

  

  var oldElement = doc.getElementById(oldID);
  console.log(`oldID: ${oldID}`);
  console.log(`id: ${id}`)

  if (oldElement == null)
  {
    document.getElementById("div" + id).remove();
    return;
  };


  //newElement.setAttribute("transform", oldElement.getAttribute("transform"));
  newElement.setAttribute("id", newElement.getAttribute("id"));


  var parentDiv = oldElement.parentNode;

  parentDiv.replaceChild(newElement, oldElement);
  document.getElementById("div" + id).remove();
}

//Обработка входящего запроса на изменение устройства
export function clickRect(id)
{
  var doc = document.getElementById('svgObject').contentDocument;
  var oldElement = doc.getElementById(id);

  
  var svgUrl = changeRect(id);

  if (svgUrl === undefined) return 0;

  

  var newElement = document.createElement('div');
  newElement.setAttribute("id", "div"+ id);
  newElement.setAttribute("style", 'opacity:0');

  newElement.innerHTML = `<object id="svgObject2" data=${svgUrl.url} type="image/svg+xml" width="1" height="1"> \
  Your browser doesnt support SVG \
  </object>`;

  var parent = document.getElementById("divSVG").parentNode;

  parent.appendChild(newElement);

  if (svgUrl.url != undefined)
  {
    setTimeout(() => {replaceRect(id, svgUrl.id);}, 100);
  }else
  {
    setTimeout(() => {document.getElementById("div" + id).remove();}, 100)
  }
  

  
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fontSize: 17, isFull: false};
    connectWs();
  }

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  }

  render() {
    document.onreadystatechange = async () => {
      if (document.readyState === 'complete') {
        var doc = document.getElementById('svgObject').contentDocument;
        // var elem = document.getElementById("svgObject");

        
        // if (!document.fullscreenElement) {
        //   elem.requestFullscreen();
        // }

        var elements = doc.querySelectorAll("g");

        for (let elem of elements) {
          var desc = elem.querySelector("desc");

          if (desc != null)
          {
            if (desc.innerHTML == "button")
              elem.style.cursor = "pointer";
          }

          //console.log(elem.getAttribute('id'));
        }

        //changeAllElements(doc);

        //Fullscreen
        doc.getElementById("g2045").addEventListener('click', (e) => {
          this.goFull();
        }); 

        //Смена линии
        doc.getElementById("g2218").addEventListener('click', (e) => {
          var stroke = (doc.getElementById("path2841").style.stroke == "#780000" || doc.getElementById("path2841").style.stroke == "rgb(120, 0, 0)") ? "#00760b" : "#780000";
          doc.getElementById("path2841").style.stroke = stroke;
        }); 

        //Смена устройства
        doc.getElementById("g2154").addEventListener('click', (e) => {
          //var rect = (doc.getElementById("0700404220633") == null) ? "0700404220631" : "0700404220633";
          //console.log(rect);
          clickRect("0700704220631");
        }); 

        //Линия А
        doc.getElementById("g2149").addEventListener('click', (e) => {
          var state = (doc.getElementById("tspan3836").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("tspan3836").innerHTML = state;
        }); 

        //Линия B
        doc.getElementById("g2142").addEventListener('click', (e) => {
          var state = (doc.getElementById("tspan3880").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("tspan3880").innerHTML = state;
        }); 

        //Линия C
        doc.getElementById("g2135").addEventListener('click', (e) => {
          var state = (doc.getElementById("tspan3906").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("tspan3906").innerHTML = state;
        }); 
        
        doc.doClickAction = (signal_id) => {
          console.log(signal_id);
          this.setState({fontSize: 27});
        }
      } 
    }
    return (
      <div id ="divSVG" >
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

        {/* <button onclick="{this.goFull}">
          Go Fullscreen
        </button> */}

        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
          
        <object id="svgObject" data={scheme} type="image/svg+xml" width="100%" height="100%" style={{ border: "1px solid black", backgroundColor: "white", marginLeft: "15px", marginTop: "10px" }}>
          Your browser doesn't support SVG
        </object>
        </Fullscreen>
      </div>
    );
  }
}

export default Main;
