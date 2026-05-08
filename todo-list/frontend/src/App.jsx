import React, { useState, useEffect } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // 1. GET - Load tasks from backend
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/list');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  // 2. POST - Add a task
  const addTask = async () => {
    await fetch('http://localhost:3001/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: input })
    });
    setInput('');
    fetchTasks(); // Refresh list
  };

  // 3. DELETE - Remove a task
  const removeTask = async (taskName) => {
    await fetch('http://localhost:3001/remove', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskName })
    });
    fetchTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="New task..." 
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t} <button onClick={() => removeTask(t)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
