import { useState, useEffect } from 'react'
import { findAll, findSome, createProduct } from '../services/api.mjs'
import TodoListItem from './todo-list-item.jsx'

function TodoList() {
    const [loading, setLoading] = useState(false)
    const [todos, setTodos] = useState([])

    const fetchData = async () => {
        setLoading(true)

        const res = await findAll()

        setTodos([...res])
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section>
            <header>
                <h2>Lista de productos</h2>
            </header>

            { loading && 
                <p>loading...</p>
            }

            <ul>
            {todos.length > 0 && todos.map(todo => (
                <TodoListItem key={todo.id} todo={todo}/>
            ))}
            </ul>
            <button onClick={createProduct}>Crear</button>
        </section>
    )
}

export default TodoList