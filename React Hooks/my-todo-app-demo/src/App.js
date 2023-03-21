import { useState, useEffect } from 'react';

import { TodoContext } from './contexts/TodoContext.js';
import { Header } from './components/Header.js';
import { TodoList } from './components/TodoList.js';
import { AddTodoModal } from './components/AddTodoModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = 'http://localhost:3031/jsonstore/todos';

function App() {
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(result => {
                setTodos(Object.values(result));
                // могат да се използват немутиращи функции като map, filter, 
                // но не могат да се ползват pop, shift, unshift, slice, push, 
                // защото те модифицират дадения масив, без да връщат нова референция

            });
    }, []); //---> празен масив означава при начално зареждане на компонента

    const onTodoAddSubmit = async (values) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ ...values, isCompleted: false })
        });
        const result = await response.json();
        setShowAddTodo(false);
        setTodos(state => [...state, result]);
    };
    const onTodoAddClick = () => {
        setShowAddTodo(true);
    };
    const onTodoAddClose = () => {
        setShowAddTodo(false);
    };
    const onTodoDeleteClick = async (todoId) => {
        await fetch(`${baseUrl}/${todoId}`, { method: 'DELETE' });
        setTodos(state => state.filter(x => x._id !== todoId));
    };

    const onTodoClick = async (todoId) => {
        const todo = todos.find(x => x._id === todoId);

        await fetch(`${baseUrl}/${todoId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                ...todo,
                isCompleted: !todo.isCompleted,
            })
        });

        setTodos(state => state.map(x => x._id === todoId ? { ...x, isCompleted: !x.isCompleted } : x));
    };

    const contextValue = {
        onTodoDeleteClick,
        onTodoClick,
    };

    return (
        <TodoContext.Provider value={contextValue}>
            <div>
                <Header />

                <TodoList
                    todos={todos}
                    onTodoAddClick={onTodoAddClick}
                />

                <AddTodoModal show={showAddTodo} onTodoAddSubmit={onTodoAddSubmit} onTodoAddClose={onTodoAddClose} />
            </div>
        </TodoContext.Provider>
    );
}

export default App;
