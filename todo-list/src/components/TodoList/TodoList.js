import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.scss';

const TodoList = ({ item }) => {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = e => {
    setTodoValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const todo = {
      title: todoValue,
      status: false
    }

    if (!todoValue) return;
    setTodos([...todos, todo]);
  }

  const handleDelete = e => {
    const { id } = e.target.parentElement;
    todos.splice(id, 1);
    setTodos([...todos]);
  };

  const handleDone = e => {
    const { id } = e.target.parentElement;
    todos[id].status = !todos[id].status;
    setTodos([...todos]);
  };

  const fetchTodo = async (item) => {
    const response = await 
      axios.get(`https://killsanghyuck.github.io/prography_5th_front/todoDummy.json`);
    setTodos(response.data.body);
  }

  useEffect(() => {
    fetchTodo(item);
  }, [item]);

  return (
    <div className="todo-list">
      <div className="todos">
        {todos && todos.map((todo, i) => (
          <ul className="todo-block" key={todo.id} id={i}>
            <li key={todo.id} className={`${todo.status === 'complete' ? 'complete' : 'todo'} text`}>{todo.title}</li>
            <button className={todo.status === 'complete' ? 'complete' : 'todo'} onClick={handleDone}>{todo.status}</button>
            <button className="delete" onClick={handleDelete}>Delete!</button>
          </ul>
        ))}
      </div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" id="todoValue" onChange={handleChange}/>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
};

export default TodoList;