import React, {useRef, useReducer, useCallback} from 'react';
import './App.css';

function App() {
    const inputRef = useRef()
    const [items, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [...state, {name: action.name, id: state.length}]
            case "remove":
                return state.filter(item => item.id !== action.id)
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

    return (
        <div style={{padding: "20px"}}>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    placeholder="Input item name and press enter..."
                    style={{minWidth: "250px"}}
                />
            </form>
            <ul>
                {items.map(item => {
                    return (
                        <li key={item.id}>{item.name} &nbsp;
                            <button key={item.id} onClick={() => dispatch({type: "remove", id: item.id})}>remove
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
