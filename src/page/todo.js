import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  useEffect(() => {
    fetchTodoList();
  }, []);

  // Todo 목록 가져오기
  function fetchTodoList() {
    axios({
      url: 'https://www.pre-onboarding-selection-task.shop/todos',
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }).then(res => {
        setTodo(res.data);
      }).catch(err => {
        console.error('Todo 목록을 가져오는 과정에서 오류 발생', err);
      });
  }

  // Todo 생성
  function createTodo() {
    axios({
      url: 'https://www.pre-onboarding-selection-task.shop/todos',
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: newTodo,
        isCompleted: false,
      },
    }).then(res => {
        setNewTodo('');
        fetchTodoList();
      }).catch(err => {
        console.error('Todo 생성 과정에서 오류 발생', err);
      });
  }

  // Todo 수정
  function updateTodo(id, updatedTodo, isCompleted) {
    const updatedTodoData = {
      todo: updatedTodo,
      isCompleted: isCompleted,
    };

    axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      method: 'put',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      data: updatedTodoData,
    }).then(res => {
        fetchTodoList();
        setEditId(null);
        setEditedTodo('');
      }).catch(err => {
        console.error('Todo 수정 과정에서 오류 발생', err);
      });
  }

  // Todo 삭제
  function deleteTodo(id) {
    axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }).then(res => {
        fetchTodoList();
      }).catch(err => {
        console.error('Todo 삭제 과정에서 오류 발생', err);
      });
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() =>
                  updateTodo(todo.id, todo.todo, !todo.isCompleted)
                }
              />
              {editId === todo.id ? (
                <input
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
              ) : (
                <span className={todo.isCompleted ? 'completed' : ''}>
                  {todo.todo}
                </span>
              )}
            </label>
            {editId === todo.id ? (
              <>
                <button onClick={() => updateTodo(todo.id, editedTodo, todo.isCompleted)}>제출</button>
                <button onClick={() => setEditId(null)}>취소</button>
              </>
            ) : (
              <>
                <button data-testid="modify-button" onClick={() => setEditId(todo.id)}>수정</button>
                <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          data-testid="new-todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button data-testid="new-todo-add-button" onClick={createTodo}>
          추가
        </button>
      </div>
    </div>
  );
}

export default TodoList;
