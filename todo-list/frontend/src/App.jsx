import React, { useState, useEffect } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editInput, setEditInput] = useState('');

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/list');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!input) return;
    await fetch('http://localhost:3001/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: input })
    });
    setInput('');
    fetchTasks();
  };

  const removeTask = async (taskName) => {
    await fetch('http://localhost:3001/remove', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskName })
    });
    fetchTasks();
  };

  const updateTask = async (oldTaskName) => {
    await fetch('http://localhost:3001/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldtask: oldTaskName, newtask: editInput })
    });
    setEditingTask(null); 
    setEditInput('');
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
          <li key={index} style={{ marginBottom: '10px' }}>
            {editingTask === t ? (
              <>
                <input 
                  value={editInput} 
                  onChange={(e) => setEditInput(e.target.value)} 
                />
                <button onClick={() => updateTask(t)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                {t} 
                <button onClick={() => { setEditingTask(t); setEditInput(t); }} style={{ marginLeft: '10px' }}>Edit</button>
                <button onClick={() => removeTask(t)}>x</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
