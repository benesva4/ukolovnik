import React from "react"

const ToDoList = () =>(
    <React.Fragment>
        <input type="text"></input>
        <button type="button">+</button>
        <ul>
            <li>Koupit mouku</li><button type="button">✏️</button><button type="button">❌</button>
            <li>Koupit vejce</li><button type="button">✏️</button><button type="button">❌</button>
            <li>Koupit prášek na pečení</li><button type="button">✏️</button><button type="button">❌</button>
        </ul>
    </React.Fragment>
)

export default ToDoList