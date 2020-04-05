import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class PollingTime extends React.Component
{
    render()
    {
        return(
            <table style={{position:"absolute", marginTop:"39%", marginLeft:"20%"}}>
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
        );
    }
}