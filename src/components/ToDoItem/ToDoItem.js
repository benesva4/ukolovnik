import React from "react"

import "./ToDoItem.css"

const ToDoItem = props => {

    const {children, edit, done}  = props
     
    return (
        < React.Fragment >
        <li>{props.children}
            <button type="button" onClick={edit}>✏️</button>
            <button type="button" onClick={done}>✔️</button>
        </li>
    </React.Fragment >
)

}
export default ToDoItem

