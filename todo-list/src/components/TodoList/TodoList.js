import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.scss';

const TodoList = ({ item }) => {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [showList, setShowList] = useState(false);
  localStorage.setItem('todos', todos);

  const handleChange = e => {
    setTodoValue(e.target.value);
  }

  const getId = () => {
    return ++todos.id;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const todo = {
      title: todoValue,
      id: getId(),
      status: 'todo'
    }

    if (!todoValue) return;
    setTodos([...todos, todo]);
    setTodoValue('');
  }

  const handleDelete = e => {
    const { id } = e.target.parentElement;
    todos.splice(id, 1);
    setTodos([...todos]);
  };

  const toggleComplete = (index) => {
    const newArr = [...todos];
    console.log(newArr);
    newArr[index].status = 'complete' ? 'complete' : 'todo';
    setTodos(newArr);
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
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" id="todoValue" value={todoValue} onChange={handleChange}/>
        <button type="submit" className="add-btn">Add Todo</button>
      </form>
      <div className="todos">
        <button className="hide-btn" onClick={() => setShowList(!showList)}>Toggle</button>
        {!showList && todos && todos.map((todo, i) => (
          <ul className="todo-block" key={i} id={i}>
            <li key={todo.id} className={`${todo.status} text`} onClick={() => toggleComplete(i)}>{todo.title}</li>
            <button className="delete" onClick={handleDelete}>Delete!</button>
          </ul>
        ))}
      </div>
    </div>
  )
};

export default TodoList;


// setTodos(
//   todos.map((todo, k) => k === i ? {...todos, complete: todo.status === 'complete' ? 'complete' : 'todo'} : todo)
// )