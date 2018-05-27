import React from "react"

const ToDoItem = props => {

    const { text, edit, done, doneEdit, blur, focus, index, activeIndex } = props

    return (
        <li className={(index === activeIndex) ? "active" : "toDo"}>
            <input
                maxLength="50"
                value={text}
                onChange={edit}
                onKeyPress={doneEdit}
                onBlur={blur}
                onFocus={focus} />
            <button
                type="button"
                onClick={done}
            ><i className="fas fa-check"></i>
            </button>
        </li>
    )
}

export default ToDoItem

