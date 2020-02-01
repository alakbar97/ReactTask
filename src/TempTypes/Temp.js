import React, { Component } from 'react';

class TempList extends Component{
    render(){
        return(
            <div className="col-4">
                <div className="form-group">
                <input
                className="inp-check"
                 type="radio"
                  name="temp"
                   value="kelvin"
                    id="kelvin"
                     onChange={this.props.change}/>
                    <label htmlFor="kelvin">Kelvin</label>
                </div>
                <div className="form-group">
                <input
                className="inp-check"
                 type="radio"
                  value="celsius"
                   name="temp"
                    id="celsius"
                    onChange={this.props.change}/>
                    <label htmlFor="celsius">Celcius</label>
                </div>
                <div className="form-group">
                <input 
                className="inp-check"
                type="radio"
                 value="fahrenheight"
                  name="temp"
                   id="fahrenheight"
                   onChange={this.props.change}/>
                    <label htmlFor="fahrenheight">Fahrenheight</label>
                </div>
          </div>
        )
    }
}

export default TempList