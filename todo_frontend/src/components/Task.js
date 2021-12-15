import React,{Component} from 'react';
import axios from 'axios';

class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
        }
    }

    componentDidMount(){
        if (this.state.tasks.length===0){
            this.getTasks();
        }
    }

    componentDidUpdate(){
        if (this.state.tasks.length===0){
            this.getTasks();
        }
    }

    getTasks = () =>{ 
        axios.get("http://127.0.0.1:8000/api/tasks/"+`user/${this.props.id}/` 
        ,{headers:{"Authorization":`Token ${this.props.token}`}})
        .then(
            response => {
                this.setState({tasks:response.data});
            }
        )
    }
    
    deleteTask = (t_id) => {
        axios.delete("http://127.0.0.1:8000/api/tasks/"+`${t_id}/`,{headers:{"Authorization":`Token ${this.props.token}`,"content-type":"application/json"}})
        .then((response)=>{
        }).then(
            ()=>{window.location.reload(false);}
        )
    }
    

    doneTask = (t_id,title,desc) => {
        console.log(this.props.token);
        axios.put("http://127.0.0.1:8000/api/tasks/"+`${t_id}/update/`,{
            headers:{"Authorization":`Token ${this.props.token}`,"Content-Type":'application/json'},
                author: this.props.id,
                title: title,
                desc: desc,
                done: true
            
        }
            )
        .then((response)=>{
            console.log(response);
        }).catch((error)=>{console.log(error)})
        .then(
            ()=>{window.location.reload(false);}
        )
        
        
    }
    render(){
        return (
            <div>
                {this.state.tasks.map(task =>(
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.desc}</p>
                    <button onClick={()=>{this.doneTask(task.id,task.title,task.desc)}}>done</button>
                    <button onClick={()=>{this.deleteTask(task.id)}}>X</button>
                </div>
                ))}
            </div>
        )
    }
    

}

export default Task
