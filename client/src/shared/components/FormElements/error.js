import React, {Component} from 'react'

// this.props.location.state.detail.user
class Error extends Component {

    
    LoginErrors=() => {
        let LoginErrors="";
        if(this.props.Error.length>0){
            LoginErrors=<div className="alert alert-warning" style={{height: "100%"
                ,margin: "0"}}>
                {this.props.Error}
            </div>;     
        }
        return LoginErrors
    }
    
    render(){
        return (
            <div >
                {this.LoginErrors()}

            </div>   
        );
    }
}

export default Error;
