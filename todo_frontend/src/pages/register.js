import React,{Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password1:'',
            password2:'',
        };
    }
    register = event =>{
        axios.post("http://127.0.0.1:8000/dj-rest-auth/registration/", {
            username: this.state.username,
            password1: this.state.password1,
            password2:this.state.password2,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch((error)=> {
            console.error(error);
          });
    }
    inputChange = event =>{
        let state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        
    }
    render(){

        return (
            <div>
                <h1>Register Form</h1>
                <label>
                    Username: <input type='text' name='username' onChange={this.inputChange}></input>
                </label>
                <br/>
                <label>
                    Password: <input type='password' name='password1' onChange={this.inputChange}></input>
                </label>
                <br/>
                <label>
                    Check Password: <input type='password' name='password2' onChange={this.inputChange}></input>
                </label>
                <br/>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
    
}

export default Register
