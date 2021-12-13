import React,{useState} from 'react';
import axios from 'axios';
import Task from '../components/Task';
import TaskCreate from '../components/TaskCreate';

function Home(props) {
    if(props.token){
        return (
            <div>
                <TaskCreate token={props.token} id={props.id}/>
                <br></br>
                <h1>To do List</h1>
                <Task token={props.token} id={props.id}/>
            </div>
        )
    }else{
        return (
            <div>
                <h1>HomePage</h1>
            </div>
            )
    }
    
}

export default Home
