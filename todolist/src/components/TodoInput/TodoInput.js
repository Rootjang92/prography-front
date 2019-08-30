import React, { useState } from 'react';
import './TodoInput.scss';

const TodoInput = ({ saveTodo, onChange, onInsert }) => {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onInsert();
    }
  }

  return (
    <div className="todo-input">
      <input onChage={onChange} value={saveTodo} onKeyPress={handleKeyPress} />
      <div className="add-button" onClick={onInsert}>추가</div>
    </div>
  );
};

export default TodoInput;