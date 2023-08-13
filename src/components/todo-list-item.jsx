function TodoListItem(props) {
    const todo = props.todo

    return (
        <li key={todo.id}>
            <h3>{todo.name}</h3>
            <h4>{todo.description}</h4>
        </li>
    )
}

export default TodoListItem