import React,{Component} from 'react';
import axios from "axios";
class TaskCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            token:this.props.token,
            id:0,
            title:'',
            desc:'',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getCurrentUserId = this.getCurrentUserId.bind(this);
    }
    componentDidMount(){
        this.getCurrentUserId();
    }
    handleChange(event) {
        const name = event.target.name;
        if (name==="title"){
            this.setState({title:event.target.value});
        }else{
            this.setState({desc:event.target.value});
        }
        
    }
    getCurrentUserId(){
        axios.get("http://127.0.0.1:8000/api/users/999999999/",{headers:{"Authorization":`Token ${this.state.token}`}})
        .then(
            response =>{
                this.setState({id:response.data.id});
            }
        )
        .catch((error)=> {
            console.error(error);
        })
    }

    handleSubmit() {
        axios.post('http://127.0.0.1:8000/api/tasks/create/',{
                headers:{"Authorization":`Token ${this.state.token}`},
                author:this.state.id,
                title:this.state.title,
                desc:this.state.desc,
                done:false,
        })
        .then(
            response =>{console.log(response);}
            )
        .then(
            ()=>{window.location.reload(false);}
        )
    }

    render(){
        return (
            <div>
                <label>
                    Title:
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                </label>
                <label>
                    Description:
                <input type="textarea" name="desc" value={this.state.desc} onChange={this.handleChange} />
                </label>
                <button type="submit" value="Add" onClick={()=>{this.handleSubmit()}}>add</button>
            </div>
        )
    }
    
}

export default TaskCreate
