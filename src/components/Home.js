import React, { useState, useEffect } from 'react';

const Home = () => {
    const [demoarray, setDemoArray] = useState([]);

    useEffect(() => {
        const ref = localStorage.getItem("demoarray");
        if (ref) {
            setDemoArray(JSON.parse(ref));
        }
    }, []);

    const renderTodo = (todo) => {
        localStorage.setItem("demoarray", JSON.stringify(demoarray));

        const list = document.querySelector(".todo-list");
        const item = document.querySelector(`[data-key='${todo.id}']`);

        if (todo.deleted) {
            const confirmDelete = window.confirm("Are you sure ?");
            if (confirmDelete) {
                const updatedArray = demoarray.filter((item) => item.id !== todo.id);
                setDemoArray(updatedArray);
            }
            return;
        }

        const isChecked = todo.checked ? "done" : "";

        const newlist = (
            <li className={`todo-item ${isChecked}`} data-key={todo.id}>
                <span>{todo.x}</span>
                <button className="delete-todo js-delete-todo" onClick={() => deleteTodo(todo.id)}>
                    <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                </button>
            </li>
        );

        if (item) {
            // Replace the existing item in the list
            const updatedArray = demoarray.map((item) => (item.id === todo.id ? todo : item));
            setDemoArray(updatedArray);
        } else {
            // Append the new item to the list
            setDemoArray([...demoarray, todo]);
        }
    }

    const myFunction = (x) => {
        const todoobject = {
            x,
            checked: false,
            id: Date.now(),
        };

        setDemoArray([...demoarray, todoobject]);

        renderTodo(todoobject);
    }

    const deleteTodo = (id) => {
        const confirmDelete = window.confirm("Are you sure ?");
        if (confirmDelete) {
            const updatedArray = demoarray.filter((item) => item.id !== id);
            setDemoArray(updatedArray);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const input = document.querySelector(".input");
        const text = input.value.trim();

        if (text !== "") {
            myFunction(text);
            input.value = "";
        }
    }

    return (
        <div className='main'>
            <div className="head">
                <h1>My ToDo</h1>
                <p>Type in the below field and press enter to add your todo in the list</p>
                <form onSubmit={handleSubmit} className="forms">
                    <input className="input" type="text" placeholder="Eg. Workout" />
                </form>
            </div>
            <div className="list">
                <h2>Your ToDo List</h2>
                <ul className="todo-list js-todo-list">
                    {demoarray.map((todo) => (
                        <li key={todo.id} className={`todo-item ${todo.checked ? 'done' : ''}`} data-key={todo.id}>
                            <span>{todo.x}</span>
                            <button className="delete-todo js-delete-todo" onClick={() => deleteTodo(todo.id)}>
                                <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;