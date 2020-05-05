import React from 'react';
import logo from './logo.svg';
import './App.css';

import scheme from './scheme.svg';
import PollingTime from './polling_time.js';
import Line44 from './line44.js';

import Fullscreen from "react-full-screen";

import { changeRect, changeLine } from './changeRect.js';

import { changeAllElements, changeElements } from './default_settings.js';


//Подключение по вебсокету
function connectWs() {
  isWs = true;
  const ws = new WebSocket('ws://localhost:8888');

  ws.onopen = () => {
    console.log('connected WS');
  }

  ws.onmessage = evt => {
    const message = JSON.parse(evt.data);

    console.log(message);

    var count = 1;
    var doc = document.getElementById('svgObject').contentDocument;
    if (message.elements != null) {
      for (var i = 0; i < message.elements.length - 1; i++) {
        clickRect(message.elements[i]);
      }
    } else if (message.lines != null) {
      for (var item of message.lines) {
        //console.log(item);
        changeLine(item.name, item.color, doc);
      }
    } else if (message.controls != null) {
      for (var item of message.controls) {
        changeControls(item.control, item.value);
      }
    }
  }

  ws.onclose = () => {
    console.log('disconnected');
  }

  return ws;
}

var isWs = false;

//Смена текста у контроллеров
function changeControls(id, value) {
  //console.log(id, value);
  var doc = document.getElementById('svgObject').contentDocument;
  var docT = doc.querySelectorAll("text");

  for (var elem of docT) {
    if (elem.id == id) {
      elem.innerHTML = value;
    }
  }
}

//Замена ячеек на схеме
function replaceRect(id, oldID, doc2) {
  var doc = document.getElementById('svgObject').contentDocument;

  var selection = doc2.querySelector('g');

  //console.log(`oldID1: ${oldID}`);
  //console.log(`id1: ${id}`)
  //console.log(`selection: ${selection}`);

  if (!selection) return;


  var newElement = selection;



  var oldElement = doc.getElementById(oldID);


  if (oldElement == null) {
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
export function clickRect(id) {
  var doc = document.getElementById('svgObject').contentDocument;
  var oldElement = doc.getElementById(id);


  var svgUrl = changeRect(id, doc);

  //console.log(`oldID: ${svgUrl.id}`);
  //console.log(`id: ${id}`)


  var newElement = document.createElement('div');
  newElement.setAttribute("id", "div" + id);
  newElement.setAttribute("style", 'opacity:0');

  newElement.innerHTML = `<object id="svgObject2" data=${svgUrl.url} type="image/svg+xml" width="1" height="1"> \
  Your browser doesnt support SVG \
  </object>`;

  var parent = document.getElementById("divSVG").parentNode;

  parent.appendChild(newElement);

  if (svgUrl.url != 0) {

    document.getElementById("svgObject2").addEventListener("load", function () {
      setTimeout((time) => {
        var doc2 = document.getElementById('svgObject2').contentDocument;
        replaceRect(id, svgUrl.id, doc2);
      }, 100);
    });

  } else {
    document.getElementById("div" + id).remove();
  }

}

function sendButton(ws, id) {
  ws.send(JSON.stringify({ type: "pressedButton", id: id }));
}


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontSize: 17, isFull: false };
  }

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  }

  render() {
    document.onreadystatechange = async () => {
      if (document.readyState === 'complete') {
        var ws;
        var doc = document.getElementById('svgObject').contentDocument;
        if (!isWs) ws = connectWs();

        var elements = doc.querySelectorAll("g");

        for (let elem of elements) {
          var desc = elem.querySelector("desc");

          if (desc != null) {
            if (desc.innerHTML == "button") {
              elem.style.cursor = "pointer";
              elem.addEventListener('click', (e) => {
                if (e.target.parentNode.tagName != "g") {
                  sendButton(ws, e.target.parentNode.parentNode.id);
                } else {
                  sendButton(ws, e.target.parentNode.id);
                }

              });
            }
          }

          //console.log(elem.getAttribute('id'));
        }

        //Fullscrean
        doc.getElementById("btn1").style.cursor = "pointer";

        //Скрытие элемент
        doc.getElementById("panel1").style.opacity = 0;

        //Fullscreen
        doc.getElementById("btn1").addEventListener('click', (e) => {
          this.goFull();
          sendButton(ws, "btn1");
        });

        //Линия А
        doc.getElementById("btn44-3").addEventListener('click', (e) => {
          var state = (doc.getElementById("txt44-1").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("txt44-1").innerHTML = state;
          //ws.send(JSON.stringify({type: "pressedButton", id: "btn44-3"}));

          doc.getElementById("text29").innerHTML = "Линия А ТП-44";
          doc.getElementById("panel1").style.opacity = 1;
        });

        //Линия B
        doc.getElementById("btn44-4").addEventListener('click', (e) => {
          var state = (doc.getElementById("txt44-12").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("txt44-12").innerHTML = state;
          //ws.send(JSON.stringify({type: "pressedButton", id: "btn44-4"}));

          doc.getElementById("text29").innerHTML = "Линия B ТП-44";
          doc.getElementById("panel1").style.opacity = 1;
        });

        //Линия C
        doc.getElementById("btn44-5").addEventListener('click', (e) => {
          var state = (doc.getElementById("txt44-13").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("txt44-13").innerHTML = state;
          //ws.send(JSON.stringify({type: "pressedButton", id: "btn44-5"}));

          doc.getElementById("text29").innerHTML = "Линия C ТП-44";
          doc.getElementById("panel1").style.opacity = 1;
        });

        //Кнопка закрыть у нижней панели
        doc.getElementById("btn44-14").addEventListener('click', (e) => {
          doc.getElementById("panel1").style.opacity = 0;
        });

        //Кнопка закрыть на панели с линией
        doc.getElementById("btnA1-20").addEventListener('click', (e) => {
          doc.getElementById("panel1").style.opacity = 0;
        });

        doc.doClickAction = (signal_id) => {
          console.log(signal_id);
          this.setState({ fontSize: 27 });
        }
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

        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
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
