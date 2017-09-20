import React, { Component } from 'react';
import Item from './Item';
import _ from 'lodash';
import shortid from 'shortid';
import axios from 'axios'

class List extends Component {
    constructor(props) {
        super(props);

        this.state = ({
        	list:[
        		{
        			id: shortid.generate(),
        			text: "",
        			done: false
        		}
        	],
        	mode: "all"
        })
    }
    componentDidMount() {
        axios.get('https://brainstation-todo-server.herokuapp.com/api/v1/todos').then((response) => {
		    this.setState({
		    	list: response.data,
		    })
		  })
		  .catch((error) => {
		    console.log(error);
		  });    	
    }
    onAddTask = (item, id) => {
    	let updateObj = {}
    	switch (item.attributes['data-type'].value){
    		case "text" :
    			updateObj.text = item.value
		     	var selectedItem = _.filter(this.state.list,{ id: id });
		    	selectedItem = Object.assign(selectedItem[0], updateObj)
		    	this.setState([...this.state.list, selectedItem])
		    	console.log(id)
    			break;
    		case "checkbox" :
    			updateObj.done = (item.classList.contains('fa-check-square-o') ? true : false)
		    	var selectedItem = _.filter(this.state.list,{ id: id });
		    	selectedItem = Object.assign(selectedItem[0], updateObj)
		    	this.setState([...this.state.list, selectedItem])
    			break;
    		case "delete" :
		    	let filterArr = _.reject(this.state.list,{ id: id });
		    	this.setState({list: filterArr})
		    	break;
    		default :
    			break;
    	}

    }
    updateMode = (e) => {
    	this.setState({ mode: e.target.attributes.id.value })
    }
    addEmptyItem = (e) => {
    	var obj = this.state.list.push({
    		id: shortid.generate(),
    		text: "",
    		done: false
    	})
    	this.setState([{list: obj}])
    }

    render() {
        return (
        	<div>
		        <nav>
		        	<h3 id="all" onClick={ this.updateMode } >All</h3>
		        	<h3 id="unfinished" onClick={ this.updateMode } >Unfinished</h3>
		        	<h3 id="finished" onClick={ this.updateMode } >Finished</h3>
		        </nav>
	            <ul className={this.state.mode} >
	            	<Item items={ this.state.list } onAddTask={ this.onAddTask.bind(this) } />
	            </ul>
	            <div className="add" onClick={ this.addEmptyItem }><i className="fa fa-plus"></i></div>
            </div>
        );
    }
}

export default List;
