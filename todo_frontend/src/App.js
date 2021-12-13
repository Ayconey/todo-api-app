import React,{Component} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import AllTasks from './pages/AllTasks';
import './App.css';
import Cookies from 'js-cookie';
import axios from "axios";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token:'',
      id:0,
    }
    
  }

  componentDidMount(){
    this.readToken();
    this.getCurrentUserId();
  }
  

  setCookieToken = (token) =>{
    Cookies.set('token',token);
  }

  readToken = () => {
    let tokeno = Cookies.get('token');
    this.setState({token:tokeno});
    console.log(tokeno);
  }

  removeToken = () => {
    if (this.state.token){
      Cookies.remove('token');
    }
    window.location.reload(false);
  }

  //user
    getCurrentUserId = () =>{
        let tokeno = Cookies.get('token');
        axios.get("http://127.0.0.1:8000/api/users/999999999/",{headers:{"Authorization":`Token ${tokeno}`}})
        .then(
            response =>{
                this.setState({id:response.data.id});
            }
        )
        .catch((error)=> {
            console.error(error);
        })
    }

  render(){
    return (
      <div className="App">
        <Router>
        <Navbar token={this.state.token} removeToken={this.removeToken} />
          <Routes>
            <Route path="/" element={<Home id={this.state.id} token={this.state.token} />} />
            <Route path="/alltime/" element={<AllTasks id={this.state.id} token={this.state.token} />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login setCookieToken={this.setCookieToken} />} />
          </Routes>
        </Router>
      </div>
      
    );
  }
}

export default App
