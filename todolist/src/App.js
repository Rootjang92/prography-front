import React from 'react';
import './App.css';

import TodoInput from './components/TodoInput';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
      </header>
      <TodoInput />
    </div>
  );
}

export default App;
