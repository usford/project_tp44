import React from 'react';
import logo from './logo.svg';
import './App.css';

import scheme from './scheme.svg';
import PollingTime from './polling_time.js';
import Line44 from './line44.js';

import Fullscreen from "react-full-screen";

import {changeRect, changeLine} from './changeRect.js';

import {changeAllElements, changeElements}  from './default_settings.js';


//Подключение по вебсокету
function connectWs(doc)
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
    try
    {
      for (var item of message.elements)
      {
        setTimeout(clickRect, count * 100, item);
        count += 2;
      }
    }catch(e)
    {
      for (var item of message.lines)
      {
        changeLine(item.name, item.color, doc);
      }
    }
  }

  ws.onclose = () => 
  {
    console.log('disconnected');
  }

  return ws;
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
  //console.log(`oldID: ${oldID}`);
  //console.log(`id: ${id}`)

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

  
  var svgUrl = changeRect(id, doc);
  

  var newElement = document.createElement('div');
  newElement.setAttribute("id", "div"+ id);
  newElement.setAttribute("style", 'opacity:0');

  newElement.innerHTML = `<object id="svgObject2" data=${svgUrl.url} type="image/svg+xml" width="1" height="1"> \
  Your browser doesnt support SVG \
  </object>`;

  var parent = document.getElementById("divSVG").parentNode;

  parent.appendChild(newElement);

  if (svgUrl.url != 0)
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
    
  }

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  }

  render() {
    document.onreadystatechange = async () => {
      if (document.readyState === 'complete') {
        var doc = document.getElementById('svgObject').contentDocument;
        var ws = connectWs(doc);
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

        //Fullscrean
        doc.getElementById("button1").style.cursor = "pointer";

        //Скрытие элемент
        doc.getElementById("panel1").style.opacity = 0;

        //Fullscreen
        doc.getElementById("button1").addEventListener('click', (e) => {
          this.goFull();
        }); 

        //Линия А
        doc.getElementById("button14").addEventListener('click', (e) => {
          var state = (doc.getElementById("text33").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("text33").innerHTML = state;
          ws.send(`Нажата кнопка button14`);

          doc.getElementById("text29").innerHTML = "Линия А ТП-44";
          doc.getElementById("panel1").style.opacity = 1; 
        }); 

        //Линия B
        doc.getElementById("button15").addEventListener('click', (e) => {
          var state = (doc.getElementById("text34").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("text34").innerHTML = state;
          ws.send("Нажата кнопка button15");

          doc.getElementById("text29").innerHTML = "Линия B ТП-44";
          doc.getElementById("panel1").style.opacity = 1; 
        }); 

        //Линия C
        doc.getElementById("button16").addEventListener('click', (e) => {
          var state = (doc.getElementById("text35").innerHTML == "ВКЛ.") ? "ВЫКЛ." : "ВКЛ.";
          doc.getElementById("text35").innerHTML = state;
          ws.send("Нажата кнопка button16");

          doc.getElementById("text29").innerHTML = "Линия C ТП-44";
          doc.getElementById("panel1").style.opacity = 1; 
        }); 

        //Кнопка закрыть у нижней панели
        doc.getElementById("button4").addEventListener('click', (e) =>
        {
          doc.getElementById("panel1").style.opacity = 0; 
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
