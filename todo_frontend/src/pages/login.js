import React,{Component} from 'react';
import axios from 'axios';


class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            username:'',
            password:'',
            token:'',
        };

    }

    login = event =>{
        axios.post("http://127.0.0.1:8000/dj-rest-auth/login/", {
            username: this.state.username,
            password: this.state.password,
          })
          .then(response => {
            this.props.setCookieToken(response.data.key);
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }).then(
              ()=>{window.location.reload(false);}
          )
          
    }

    inputChange = event =>{
        let state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        
    }

    render(){

        return (
            <div>
                <h1>Login Form</h1>
                <label>
                    Username: <input type='text' name='username' onChange={this.inputChange}></input>
                </label>
                <br/>
                <label>
                    Password: <input type='password' name='password' onChange={this.inputChange}></input>
                </label>
                <br/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
    
}

export default Login
