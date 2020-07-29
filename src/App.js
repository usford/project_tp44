import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

import scheme from './scheme.svg';
import PollingTime from './polling_time.js';
import Line44 from './line44.js';


import { changeRect, changeLine } from './changeRect.js';

import { changeAllElements, changeElements } from './default_settings.js';

import styleConfig from './styleConfig';

import lineA1 from './lineA1.js';
import lineB1 from './lineB1.js';
import lineC1 from './lineC1.js';
import line from './line.js';

import DialogFullscreen from './dialog_fullscreen.js';

import {launchFullScreen, cancelFullscreen} from './fullscreen.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontSize: 17};
  }

  goFull = () => {
    if (!document.fullscreen)
    {
      launchFullScreen(document);
    }else
    {
      cancelFullscreen(document);
    }
  }

  render() {
    document.onreadystatechange = async () => {
      if (document.readyState === 'complete') {
        let ws;
        let doc = document.getElementById('svgObject').contentDocument;

        if (!isWs) ws = connectWs();
        
        let elements = doc.querySelectorAll("g");

        for (let elem of elements) {
          let desc = elem.querySelector("desc");

          if (desc != null) {
            if (desc.innerHTML == "button") {
              elem.style.cursor = "pointer";
              elem.addEventListener('click', (e) => {
                if (e.target.parentNode.tagName != "g") {
                  if (!delayChangeMode)
                  {
                    sendButton(ws, e.target.parentNode.parentNode.id);
                  }
                } else {
                  if (!delayChangeMode)
                  {
                    sendButton(ws, e.target.parentNode.id);
                  }   
                }

              });
            }
          }

          //console.log(elem.getAttribute('id'));
        }

        //Fullscreen
        doc.getElementById("btn1").style.cursor = "pointer";
        doc.getElementById("btn1").addEventListener('click', (e) => {
          this.goFull();
          sendButton(ws, "btn1");
        });   

        //document.documentElement.requestFullscreen();
        
        doc.doClickAction = (signal_id) => {
          console.log(signal_id);
          this.setState({ fontSize: 27 });
        }



        //let fullScreenState = window.confirm("Включить полноэкранный режим?");
      }
    }
    return (
      <div id="divSVG" >
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
        
        <Suspense fallback={<div>Загрузка...</div>}>
          <DialogFullscreen></DialogFullscreen>
          <object id="svgObject" data={scheme} type="image/svg+xml" width="95%" height="95%" style={{ border: "1px solid black", backgroundColor: "white", marginLeft: "15px", marginTop: "10px" }}>
              Your browser doesn't support SVG
          </object>
        </Suspense>

        <p><span style={{fontSize: 10}}>Версия приложения: 0.7</span></p>
        
      </div>
    );
  }
}

let delayChangeMode = false;

//Подключение по вебсокету
function connectWs() {
  isWs = true;
  const ws = new WebSocket('ws://localhost:8888');

  ws.onopen = () => {
    console.log('connected WS');
    let doc = document.getElementById('svgObject').contentDocument;
    styleConfig(doc);
    
  }

  ws.onmessage = evt => {
    const message = JSON.parse(evt.data);

    console.log(message);

    let count = 1;
    let doc = document.getElementById('svgObject').contentDocument;

    if (message.elements != null) {
      for (let i = 0; i < message.elements.length; i++) {
        let lastSymb = message.elements[i][message.elements[i].length-1];
        clickRect(message.elements[i]);
        //clickRect(message.elements[i]);
        //console.log(message.elements[i]);
      }
    } else if (message.lines != null) {
      for (let item of message.lines) {
        //console.log(item);
        changeLine(item.name, item.color, doc);
      }
    } else if (message.controls != null) {
      for (let item of message.controls) {
        changeControls(item.control, item.value);
      } 
    }else if (message.controlsPanels != null) {
      for (let item of message.controlsPanels)
      {
        if (item.value == 1)
        {
          line(item.control);
        } 
      }
    }else if (message.controlsButtons != null) {
      for (let item of message.controlsButtons) {
        if (item.value == 1)
        {
          doc.getElementById(item.control).style.opacity = 1;
        }else
        {
          doc.getElementById(item.control).style.opacity = 0.3;
        } 
      } 
    }

    delayChangeMode = true;
    setTimeout(function(){delayChangeMode = false}, 200);
  }

  ws.onclose = () => {
    console.log('disconnected');
  }

  return ws;
}

let isWs = false;

//Смена текста у контроллеров
function changeControls(id, value) {
  //console.log(id, value);
  let doc = document.getElementById('svgObject').contentDocument;
  let docT = doc.querySelectorAll("text");

  for (let elem of docT) {
    if (elem.id == id) {
      elem.innerHTML = value;
    }
  }
}

//Замена ячеек на схеме
function replaceRect(id, oldID, doc2) {
  let doc = document.getElementById('svgObject').contentDocument;

  let selection = doc2.querySelector('g');

  //console.log(`oldID1: ${oldID}`);
  //console.log(`id1: ${id}`)
  //console.log(`selection: ${selection}`);

  if (!selection) return;

  let newElement = selection;
  let oldElement = doc.getElementById(oldID);

  if (oldElement == null) {
    document.getElementById("div" + id).remove();
    return;
  };

  //newElement.setAttribute("transform", oldElement.getAttribute("transform"));
  newElement.setAttribute("id", newElement.getAttribute("id"));

  let parentDiv = oldElement.parentNode;

  parentDiv.replaceChild(newElement, oldElement);
  document.getElementById("div" + id).remove();
}

//Обработка входящего запроса на изменение устройства
export function clickRect(id) {
  let doc = document.getElementById('svgObject').contentDocument;
  let oldElement = doc.getElementById(id);
  let svgUrl = changeRect(id, doc);

  // console.log(`oldID: ${svgUrl.id}`);
  // console.log(`id: ${id}`)

  let newElement = document.createElement('div');
  newElement.setAttribute("id", "div" + id);
  newElement.setAttribute("style", 'opacity:0');

  newElement.innerHTML = `<object id="svgObject2" data=${svgUrl.url} type="image/svg+xml" width="1" height="1"> \
  Your browser doesnt support SVG \
  </object>`;

  let parent = document.getElementById("divSVG").parentNode;

  parent.appendChild(newElement);

  if (svgUrl.url != 0) {

    document.getElementById("svgObject2").addEventListener("load", function () {
      setTimeout((time) => {
        let doc2 = document.getElementById('svgObject2').contentDocument;
        replaceRect(id, svgUrl.id, doc2);
      }, 100);
    });

  } else {
    document.getElementById("div" + id).remove();
  }

}

//Отправка id кнопка на сервер
function sendButton(ws, id) {
  ws.send(JSON.stringify({ type: "pressedButton", id: id }));
}


export default Main;
