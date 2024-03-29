import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

import schema from './schema.svg';
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

let activeElements = new Array();
let activeLines = new Array();

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

        doc.getElementById(`txt04-355`).innerHTML = '';
        doc.getElementById(`txt04-366`).innerHTML = '';
        doc.getElementById(`txt04-377`).innerHTML = '';

        if (!isWs) ws = connectWs();
        
        let elements = doc.querySelectorAll("g");

        for (let elem of elements) {
          let desc = elem.querySelector("desc");

          if (elem.id == "panelLine") continue;

          if (desc != null) {
            if (desc.innerHTML == "button") {
              elem.style.cursor = "pointer";

              elem.addEventListener('click', (e) => {
                let opacity = 1;
                if (e.target.parentNode.tagName != "g") {
                  if (doc.getElementById(e.target.parentNode.parentNode.id) != null )
                  {
                    opacity = doc.getElementById(e.target.parentNode.parentNode.id).style.opacity;
                  }

                  if (e.target.parentNode.parentNode.id == "1kn04-032.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-033.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-034.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-035.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-036.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-037.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-038.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-039.2"
                  ||  e.target.parentNode.parentNode.id == "1kn04-040.2")
                  {
                    opacity = 1;
                  }

                  if (!delayChangeMode && opacity != 0.3)
                  {
                    sendButton(ws, e.target.parentNode.parentNode.id, doc);
                  }
                } else {
                  if (doc.getElementById(e.target.parentNode.id) != null)
                  {
                    opacity = doc.getElementById(e.target.parentNode.id).style.opacity;
                  }
                  
                  if (!delayChangeMode && opacity != 0.3)
                  {
                    sendButton(ws, e.target.parentNode.id, doc);
                  }   
                }

                if (e.target.parentNode.id == "1kn04-054.1")
                {
                  window.open("http://localhost:3001");

                  setTimeout(() =>
                  {
                    let lol = window.open("about:blank", "_self");
                    lol.close();
                  });
                  // window.open("about:blank", "_self");
                  // window.close();
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
          <object id="svgObject" data={schema} type="image/svg+xml" width="100%" height="92%" style={{ border: "1px solid black", backgroundColor: "white", marginLeft: "15px", marginTop: "10px" }}>
              Your browser doesn't support SVG
          </object>
        </Suspense> 
      </div>
    );
  }
}
//<p><span style={{fontSize: 10}}>Версия приложения: 0.7</span></p>

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
      activeElements = new Array();
      for (let i = 0; i < message.elements.length; i++) {
        let lastSymb = message.elements[i][message.elements[i].length-1];
        clickRect(message.elements[i]);

        //clickRect(message.elements[i]);
        //console.log(message.elements[i]);
      }
      setTimeout(() => 
      {
        activeElements = new Array();
        let allElements = doc.querySelectorAll("g");
        for (let index in allElements)
        {
          try{
            let result = allElements[index].getAttribute("id").startsWith("07");
            if (result)
            {
              activeElements.push(allElements[index].getAttribute("id"));
            }
          }catch(e)
          {

          }
        }
        ws.send(JSON.stringify({ type:"activeElements", elements: activeElements }));
      }, 1500)
    } else if (message.lines != null) {
      for (let item of message.lines) {
        //console.log(item);
        changeLine(item.name, item.color, doc);
      }

      setTimeout(() => 
      {
        activeLines = new Array();
        let allLines = doc.querySelectorAll("g");
        for (let index in allLines)
        {
          try{
            let result = allLines[index].getAttribute("id").startsWith("ln");
            if (result)
            {
              //"#ff0000"
              //"#007600"
              let id = allLines[index].getAttribute("id");
              var lastSymb = id[id.length-1];
              activeLines.push({name: id, color: (lastSymb == "1") ? "#ff0000" : "#007600"});
            }
          }catch(e)
          {

          }
        }
        allLines = doc.querySelectorAll("path");
        for (let index in allLines)
        {
          try{
            let result = allLines[index].getAttribute("id").startsWith("ln");
            if (result)
            {
              //"#ff0000"
              //"#007600"
              let id = allLines[index].getAttribute("id");
              var lastSymb = id[id.length-1];
              activeLines.push({name: id, color: (lastSymb == "1") ? "#ff0000" : "#007600"});
            }
          }catch(e)
          {

          }
        }
        ws.send(JSON.stringify({ type:"activeLines", lines: activeLines }));
      }, 1500)
    } else if (message.controls != null) {
      for (let item of message.controls) {
        changeControls(item.control, item.value);
      } 
    }else if (message.controlsPanels != null) {
      let counter = 0;
      for (let item of message.controlsPanels)
      {
        if (item.value == 1)
        {
          line(item.control);
          counter++;
        } 

        if (counter == 0) line("empty");
      }
    }else if (message.controlsButtons != null) {
      for (let item of message.controlsButtons) {
        if (item.value == 1)
        {
          doc.getElementById(item.control).style.opacity = 1;
        }else if (item.value == 0)
        {
          doc.getElementById(item.control).style.opacity = 0.3;
        }
      } 
    }else if (message.stateTimers != null) {
      message.stateTimers.forEach((timer) =>
      {
        doc.getElementById(timer.id).value = timer.value;
      });
    }
    delayChangeMode = true;
    setTimeout(function(){delayChangeMode = false}, 1500);
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

  if (svgUrl == 0) return;

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
      }, 1000);
    });

  } else {
    document.getElementById("div" + id).remove();
  }

}

//Отправка id кнопки на сервер
function sendButton(ws, id, doc) {
  if (id == "1kn04-010.1"
  ||  id == "1kn04-013.1"
  ||  id == "1kn04-016.1"
  ||  id == "1kn04-019.1")
  {
    let num008_1 = doc.getElementById("num04-008.1").value;
    let num008_2 = doc.getElementById("num04-008.2").value;

    let num009_1 = doc.getElementById("num04-009.1").value;
    let num009_2 = doc.getElementById("num04-009.2").value;

    let num010_1 = doc.getElementById("num04-010.1").value;
    let num010_2 = doc.getElementById("num04-010.2").value;

    let num011_1 = doc.getElementById("num04-011.1").value;
    let num011_2 = doc.getElementById("num04-011.2").value;

    let activeTimers = [];

    activeTimers.push({id: "num04-008.1", value: num008_1});
    activeTimers.push({id: "num04-008.2", value: num008_2});

    activeTimers.push({id: "num04-009.1", value: num009_1});
    activeTimers.push({id: "num04-009.2", value: num009_2});

    activeTimers.push({id: "num04-010.1", value: num010_1});
    activeTimers.push({id: "num04-010.2", value: num010_2});

    activeTimers.push({id: "num04-011.1", value: num011_1});
    activeTimers.push({id: "num04-011.2", value: num011_2});

    ws.send(JSON.stringify({type: "stateTimers", activeTimers: activeTimers}));
  }
  ws.send(JSON.stringify({ type: "pressedButton", id: id }));
}


export default Main;
