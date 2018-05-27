import React, { Component } from "react"

import ToDoItem from "../ToDoItem/ToDoItem"
import "./ToDoList.css"

class ToDoList extends Component {
    state = {
        toDoItems: [],
        inputTemp: "",
        activeIndex: null,
        activeInput: false
    }

    // fetch data from memory and put them to the state
    componentDidMount = () => {
        const toDoItems = JSON.parse(localStorage.getItem("toDoItems"))
        if (toDoItems !== null) this.setState({ toDoItems })

    }

    // save toDoItems to storage 
    componentDidUpdate = () => localStorage.setItem("toDoItems", JSON.stringify(this.state.toDoItems))

    // newToDoHandler pushes temporary toDo to the toDoItems
    // and reseting the temporary input
    newToDoHandler = event => {
        if (this.state.inputTemp !== "") {
            let toDoItems = this.state.toDoItems
            toDoItems.push(this.state.inputTemp)
            this.setState({ toDoItems, inputTemp: "" })
        }
    }

    // inputHandler updates temporary toDo in the state
    inputChangeHandler = event => {
        const inputTemp = event.target.value
        this.setState({ inputTemp })
    }

    // doneHandler splaces out completed item
    doneHandler = (index) => {
        let toDoItems = this.state.toDoItems
        toDoItems.splice(index, 1)
        this.setState({ toDoItems: toDoItems })
    }

    // editHandler is updating the state when the toDoItem is updated
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

    // handleFocus sets the index of the focused ToDoItem to the state
    // so it can be evalated to set the class of the ToDoItem
    handleFocus = index => {
        this.setState({ activeIndex: index })
    }

    // handleBlur resets the activeIndex and calls doneHandler for empty inputs
    handleBlur = index => {
        this.setState({ activeIndex: null })
        const toDoItem = this.state.toDoItems[index]
        if (toDoItem.length === 0) {
            this.doneHandler(index)
        }
    }

    // handlers used for toggling the className="active" of the Input
    inputFocusHandler = () => this.setState({ activeInput: true })
    inputBlurHandler = () => this.setState({ activeInput: false })

    render() {
        // toDoList is mapping the toDoItems from state to ToDoItem component
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
                    blur={() => this.handleBlur(index)}
                    focus={() => this.handleFocus(index)} />
            )
            )

        return (
            <div id="list">
                <ul>
                    <li id="input" className={this.state.activeInput ? "active" : ""}>
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