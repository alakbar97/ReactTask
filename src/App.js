import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Temp from './TempTypes/Temp';
import Search from './SearchInput/Search';

const apiId="16596fe956171a7376f2ba91213e3499";
let celsiArray=[];
let farArray=[];
let kelvinArray=[];
let checkedValue ='';

    class App extends Component {

                  state={
                    stats:[]
                  }         
            
                  changeState=(value)=>{
                    switch (value) {
                      case "kelvin":
                        this.setState({
                          stats:kelvinArray
                        })
                        break;
                    case "celsius":
                      this.setState({
                        stats:celsiArray
                      })
                      break;

                      case "fahrenheight":
                        this.setState({
                          stats:farArray
                        })
                      break;

                      default:
                        this.setState({
                          stats:celsiArray
                        })
                        break;
                    }
                  }

                  calculateFahrenheight=(value)=>{
                    return Math.ceil(((value-273) * 9/5) + 32);
                  }

                  calculateCelcius=(value)=>{
                    return Math.ceil(value - 273.15)
                  }

                  createArrays=(kel,cel,far,name)=>{
                    const newCelObj={
                      name,
                      degree:`${cel} Celsius`
                    }
                    const newFarObj={
                      name,
                      degree:`${far} Fahrenheight`
                    }

                    const newKelObj={
                      name,
                      degree:`${kel} Kelvin`
                    }

                    celsiArray.push(newCelObj);
                    farArray.push(newFarObj);
                    kelvinArray.push(newKelObj);
                  }


                  checkStatus=(status)=>{                    
                    const text = document.getElementById("message");
                    if(status===404 || status===400){
                      text.classList.add('d-block');
                      setTimeout(function () {
                          text.classList.remove('d-block');
                      }, 1500)
                      return false;
                    }
                    return true;
                  }

                  getWeather=async (e)=>{

                        e.preventDefault();   

                        if(document.querySelector('.inp-check:checked')!=null){
                          checkedValue=document.querySelector('.inp-check:checked').value
                        };

                        const inp=document.getElementById("search");


                        const result=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inp.value}&appid=${apiId}`);

                       if(!this.checkStatus(result.status)){
                         return false;
                       };

                        const jsonedData=await result.json();

                        let kelvin=jsonedData?.main?.temp;

                        let far=this.calculateFahrenheight(jsonedData?.main?.temp);

                        let cel =this.calculateCelcius(jsonedData?.main?.temp);

                        this.createArrays(kelvin,cel,far,jsonedData?.name);

                        this.changeState(checkedValue);

                        inp.value="";

                      
                  };

                  changeDegree=(e)=>{
                    this.changeState(e.target.value);
                    };

                    filterArrays=(item)=>{
                      celsiArray=celsiArray.filter((val)=>{
                        return val.name!==item.name;
                      });
                      farArray=farArray.filter((val)=>{
                        return val.name!==item.name;
                      });
                      kelvinArray=kelvinArray.filter((val)=>{
                        return val.name!==item.name;
                      });
                    }

                  deleteHandler=(item)=>{                            
                    this.filterArrays(item);
                    const filteredArray=this.state.stats.filter((val)=>{
                      return val!==item;
                    });
                    this.setState({
                      stats:filteredArray
                    })
                  }

                  render(){
                        return (
                        <div className="container p-5">
                          <div className="row">
                          <Search submit={this.getWeather}/>
                            <Temp change={this.changeDegree}/>
                            <div className="col-4">
                              <ul className="list-group" id="cities">
                              {this.state.stats.map(item => (
                              <li className="list-group-item" key={Math.random()}>
                            <input onClick={this.deleteHandler.bind(this,item)} type="button" value="-"/>
                            <span>{item.name} {item.degree}</span>
                                </li>
                                    ))}
                              </ul>
                            </div>
                          </div>            
                        </div>         
                      );
                    }
      }


export default App;
