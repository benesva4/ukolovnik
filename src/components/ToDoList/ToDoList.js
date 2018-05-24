import React, { Component } from "react"

import ToDoItem from "../ToDoItem/ToDoItem"
import "./ToDoList.css"


// ToDoList is the main point of the app
// It consist of state which contain todos
class ToDoList extends Component {
    state = {
        toDoItems: [
            "Koupit mouku",
            "Koupit chleba",
            "Koupit vejce"
        ]
    }

    inputHandler = (e) => {
        const input = document.getElementById("toDoInput").value
        let toDoItems = this.state.toDoItems
        toDoItems.push(input)
        this.setState({ toDoItems })
    }

    doneHandler = () => {
        
    }

    editHandler = () => console.log("edit") 

    render() {

        //TODO: zkusit pak const
        // toDoList is mapping the toDoItems from state ToDoItems component
        // as a children
        const toDoList = this.state.toDoItems
            .map((toDo, index) => <ToDoItem
                key={index}
                done={this.doneHandler}
                edit={this.editHandler}
                >{toDo}</ToDoItem>)

        return (
            <React.Fragment>
                <input id="toDoInput" type="text" ></input>
                <button type="button" onClick={this.inputHandler}>+</button>
                <ul>
                    {toDoList}
                </ul>
            </React.Fragment>
        )
    }
}
export default ToDoList