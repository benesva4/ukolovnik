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
        if (toDoItems !== null) { this.setState({ toDoItems }) }
    }

    // save toDoItems to storage 
    componentDidUpdate = () => localStorage.setItem("toDoItems", JSON.stringify(this.state.toDoItems))

    // newToDoHandler pushes temporary toDo to the toDoItems
    // and reseting the temporary input
    newToDoHandler = () => {
        if (this.state.inputTemp !== "") {
            this.setState(({ toDoItems, inputTemp }) => {
                return {
                    toDoItems: [...toDoItems, inputTemp],
                    inputTemp: ""
                }
            })
        }
    }

    // inputHandler updates temporary toDo in the state
    inputChangeHandler = event => this.setState({ inputTemp: event.target.value })

    // doneHandler splices out completed item
    doneHandler = index => this.setState(prevState => ({ toDoITems: prevState.toDoItems.splice(index, 1) }))

    // editHandler is updating the state when the toDoItem is updated
    editHandler = (event, index) => {
        const key = event.target.value
        this.setState(({ toDoItems }) => {
            const newToDoItems = [...toDoItems]
            newToDoItems[index] = key
            return { toDoItems: newToDoItems }
        })
    }

    // doneEditHandler unfocus input field when the enter is pressed
    // and delete the task if the input is empty
    doneEditHandler = (event, index) => {
        if (event.key === "Enter") { event.target.blur() }
    }

    // handleFocus sets the index of the focused ToDoItem to the state
    // so it can be evalated to set the class of the ToDoItem
    handleFocus = index => this.setState({ activeIndex: index })

    // handleBlur resets the activeIndex and calls doneHandler for empty inputs
    handleBlur = index => {
        this.setState({ activeIndex: null })
        if (this.state.toDoItems[index].length === 0) {
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