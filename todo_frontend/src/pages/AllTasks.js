import React,{Component} from 'react';
import axios from "axios";
class AllTasks extends Component {
    constructor(props){
        super(props);
        this.state = {
            done_tasks:[],
        }
    }

    componentDidMount(){
        if(this.state.done_tasks.length ===0){
            this.getDoneTasks();
        }
    }


    getDoneTasks(){
        axios.get("http://127.0.0.1:8000/api/tasks/"+`user/${this.props.id}/done/` 
        ,{headers:{"Authorization":`Token ${this.props.token}`}})
        .then(
            response => {
                this.setState({done_tasks:response.data});
            }
        )
    }

    render(){
        return (
        <div>
            <h1>All Tasks Done</h1>
            {this.state.done_tasks.map(task =>(
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.desc}</p>
                </div>
                ))}
        </div>
        )
    }
}

export default AllTasks
