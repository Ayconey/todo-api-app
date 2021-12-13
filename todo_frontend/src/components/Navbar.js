import React,{useState} from 'react';
import axios from 'axios';
import Logo from "../assets/logo.png";
import { Link } from 'react-router-dom'
import '../styles/Navbar.css';
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar(props) {

    const [show_links,setLinks] = useState(false);
    const toggleNavbar = () => {
        setLinks(! show_links);
    };

    const handleLogout = event =>{
        axios.post("http://127.0.0.1:8000/dj-rest-auth/logout/", {
            
          })
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        props.removeToken();
    }
    


    if (props.token){
        return (
            <div className="navbar">
                <div className="leftSide" id={show_links ? 'open':'close'}>
                    <img src={Logo}/>
                    <div className="hiddenLinks">
                        <Link to="/">Home</Link>
                        <Link to="/alltime/">all done tasks</Link>
                        <Link onClick={handleLogout} to="/">logout</Link>
                    </div>
                </div>
                <div className="rightSide">
                    <Link to="/">Home</Link>
                    <Link to="/alltime/">all done tasks</Link>
                    <Link onClick={handleLogout} to="/">logout</Link>
                    <button onClick={toggleNavbar}>
                        <ReorderIcon />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="navbar">
            <div className="leftSide" id={show_links ? 'open':'close'}>
                <img src={Logo}/>
                <div className="hiddenLinks">
                    <Link to="/">Home</Link>
                    <Link to="/register/">register</Link>
                    <Link to="/login/">login</Link>
                </div>
            </div>
            <div className="rightSide">
                <Link to="/">Home</Link>
                <Link to="/register/">register</Link>
                <Link to="/login/">login</Link>
                <button onClick={toggleNavbar}>
                    <ReorderIcon />
                </button>
            </div>
        </div>
    )
}

export default Navbar
