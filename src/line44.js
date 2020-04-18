import React from 'react';
import { Row, Col } from 'react-bootstrap';

var defaultWidth;
export default class Line44 extends React.Component
{
    constructor()
    {
        super();
        this.state = {
        }
    }
    getScale(currentScale)
    {
        this.setState({scale: currentScale});  
    }
    render()
    {
        return(
            <div>
                <table style={{position:"absolute", backgroundColor:"#f0f0f0", marginTop:"25%", marginLeft:"30%"}}>
                    <tr style={{fontWeight:"800", textAlign:"center"}}>
                        <td colspan="2">
                            Линия А ТП-44
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Дистанционное управление на ТП
                        </td>
                        <td>
                        <input value="ВКЛЮЧЕНО" style={{boxShadow: "-0.2px -0.2px", height:"15px"}}></input>  
                        </td>
                    </tr>

                    <tr style={{textAlign:"center"}}>
                        <td colspan="2">
                            Разрешение на дистанционное управление
                        </td>
                    </tr>

                    <tr style={{textAlign:"center"}}>
                        <td>
                            ВКЛ
                            <input value={(this.state.avr === true) ? "X" : "X"} style={{boxShadow: "-0.2px -0.2px", height:"15px", width:"20px", textAlign:"center", fontSize:16}}></input>
                        </td>
                        <td>
                            ВЫКЛ
                            <input value={(this.state.avr === true) ? "X" : ""} style={{boxShadow: "-0.2px -0.2px", height:"15px", width:"20px", textAlign:"center", fontSize:16}}></input>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}