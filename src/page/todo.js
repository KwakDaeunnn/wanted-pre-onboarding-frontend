import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [todos, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');
  const navigate = useNavigate();

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
        console.log('Todo 목록 가져오기 성공');
        setTodo(res.data);
      }).catch(err => {
        console.error('Todo 목록 가져오기 실패', err);
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
        console.log('Todo 생성 성공');
        setNewTodo('');
        fetchTodoList();
      }).catch(err => {
        console.error('Todo 생성 실패', err);
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
        console.log('Todo 수정 성공');
        fetchTodoList();
        setEditId(null);
        setEditedTodo('');
      }).catch(err => {
        console.error('Todo 수정 실패', err);
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
        console.log('Todo 삭제 성공');
        fetchTodoList();
      }).catch(err => {
        console.error('Todo 삭제 실패', err);
      });
  }

  // 로그아웃
  function logout() {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('access_token');
    navigate('/signin');
  }


  return (


    <div className='sign-box'>
      <h2>Todo List</h2>
      <div>
        <input
          data-testid="new-todo-input"
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button data-testid="new-todo-add-button" onClick={createTodo}>
          추가
        </button>
      </div>
      
      <ul className='todo-box'>
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
                  onChange={e => setEditedTodo(e.target.value)}
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
                <button data-testid="modify-button" onClick={() => { setEditId(todo.id); setEditedTodo(todo.todo); }}>수정</button>
                <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
      
      <button onClick={logout}>로그아웃</button>
      
    </div>
  );
}

export default TodoList;
