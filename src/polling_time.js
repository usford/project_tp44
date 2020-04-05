import React from 'react';
import { Row, Col } from 'react-bootstrap';

var defaultWidth;
export default class PollingTime extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            scale: 100,
        }

        this.getScale = this.getScale.bind(this);

        defaultWidth = window.innerWidth;
    }
    getScale(currentScale)
    {
        this.setState({scale: currentScale});  
    }
    render()
    {
        window.defaultWidth = window.innerWidth;
        window.onresize = () => this.getScale((defaultWidth / window.innerWidth).toFixed(2) * 100);
        console.log("Обновился");
        return(
            <div>
                <table style={{position:"absolute", marginTop:"39.5%", marginLeft:"20%", backgroundColor:"#f0f0f0", transform: `scale(${100/this.state.scale})`}}>
                    <tr>
                        <p style={{fontWeight:"400", margin:0, padding:0}}>Время опроса счетчиков</p>
                    </tr>

                    <tr align="center">
                        <input value="27.02.2020 17:03" style={{boxShadow: "-0.2px -0.2px", height:"15px"}}></input>   
                    </tr>

                    <tr>
                        <p style={{fontWeight:"400", margin:0, padding:0}}>Установка времени</p>
                    </tr>

                    <tr align="center">
                        <input value="27.02.2020 17:03" style={{boxShadow: "-0.2px -0.2px", height:"15px"}}></input>    
                    </tr>

                    <tr align="center">
                        <button onClick={this.pusk} style={{marginTop:"10px", boxShadow: "1.5px 1.5px", border: "none", fontWeight:"500", height:"15px", margin:0, padding:0, width:"90px"}}>Пуск опроса</button>
                    </tr>
                </table>
            </div>
        );
    }
}