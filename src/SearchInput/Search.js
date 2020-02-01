import React,{Component} from 'react';

class Form extends Component{
    preventNumber=(e)=>{
        if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
            e.preventDefault();
        };
    }
render(){
    return(
        <div className="col-8">
        <form method="post" onSubmit={this.props.submit}>
        <input onKeyDown={this.preventNumber} className="form-control" type="text" id="search"/>
        <span id="message" className="d-none text-danger">Provided name is not valid</span>
        </form>
    </div>
    )
}
}

export default Form;