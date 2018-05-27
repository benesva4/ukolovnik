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
            "Koupit vejce",
        ],
        inputTemp: "",
        activeIndex: null,
        activeInput: false
    }

    newToDoHandler = event => {
        if (this.state.inputTemp !== "") {
            let toDoItems = this.state.toDoItems
            toDoItems.push(this.state.inputTemp)
            this.setState({ toDoItems, inputTemp: "" })
        }
    }

    inputChangeHandler = event => {
        const inputTemp = event.target.value
        this.setState({ inputTemp })
    }

    doneHandler = (index) => {
        let toDoItems = this.state.toDoItems
        toDoItems.splice(index, 1)
        this.setState({ toDoItems: toDoItems })
    }

    editHandler = (event, index) => {
        let toDoItems = this.state.toDoItems
        toDoItems[index] = event.target.value
        this.setState({ toDoItems })
    }

    // doneEditHandler unfocus input field when the enter is pressed
    // and delete the task if the input is empty
    doneEditHandler = (event, index) => {
        if (event.key === "Enter") {
            event.target.blur()
        }
    }

    handleBlur = (event,index) => {
        this.setState({activeIndex: null})
        const toDoItem = this.state.toDoItems[index]
        if (toDoItem.length === 0) {
            this.doneHandler(index)
        }
    }

    handleFocus = (event, index) => {
        this.setState({activeIndex: index})
    }

    inputFocusHandler = () => !this.state.activeInput ? this.setState({ activeInput: true}) : null
    inputBlurHandler = () => this.state.activeInput ? this.setState({ activeInput: false}) : null

    render() {
        // toDoList is mapping the toDoItems from state ToDoItems component
        // as a children
        const toDoList = this.state.toDoItems
            .map((toDo, index) => (
                <ToDoItem
                    activeIndex={this.state.activeIndex}
                    index={index}
                    key={index}
                    done={() => this.doneHandler(index)}
                    edit={(event) => this.editHandler(event, index)}
                    doneEdit={(event) => this.doneEditHandler(event, index)}
                    text={toDo}
                    blur={(event) => this.handleBlur(event, index)}
                    focus={(event) => this.handleFocus(event, index)} />
            )
            )

        return (
            <div id="list">
                <ul>
                    <li id="input" className={ this.state.activeInput ? "active" : "" }>
                        <input
                            value={this.state.inputTemp}
                            placeholder="Vložte nový úkol."
                            onChange={this.inputChangeHandler}
                            onKeyPress={e => e.key === "Enter" ? this.newToDoHandler() : null}
                            onFocus={this.inputFocusHandler}
                            onBlur={this.inputBlurHandler}
                            />
                            
                        <button type="button" onClick={this.newToDoHandler}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </li>
                    {toDoList}
                </ul>
            </div >
        )
    }
}
export default ToDoList