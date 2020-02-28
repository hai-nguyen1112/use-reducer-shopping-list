import React, { useRef, useReducer, useCallback, useEffect } from 'react';
import './App.css';
import {isEmpty} from 'lodash'

function App() {
    const inputRef = useRef()
    const clearListButtonRef = useRef()
    const [items, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [...state, {name: action.name, id: state.length}]
            case "remove":
                return state.filter(item => item.id !== action.id)
            case "clear":
                return []
            default:
                return state
        }
    }, [])

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        if (inputRef.current.value !== "") {
            dispatch({type: "add", name: inputRef.current.value})
            inputRef.current.value = ""
        }
    }, [])

    const handleRemoveItem = useCallback(id => {
        dispatch({type: "remove", id: id})
    }, [])

    useEffect(() => {
        if (isEmpty(items)) {
            clearListButtonRef.current.setAttribute("disabled", true)
        } else {
            clearListButtonRef.current.removeAttribute("disabled")
        }
    }, [items])

    const handleClearList = useCallback(() => {
        dispatch({type: "clear"})
    }, [])

    return (
        <div style={{padding: "20px"}}>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    placeholder="Input item name and press enter..."
                    style={{minWidth: "250px"}}
                />
            </form>
            <br/>
            <button ref={clearListButtonRef} onClick={handleClearList}>Clear List</button>
            <ul>
                {items.map(item => {
                    return (
                        <li key={item.id}>{item.name} &nbsp;
                            <button key={item.id} onClick={() => handleRemoveItem(item.id)}>
                                remove
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
