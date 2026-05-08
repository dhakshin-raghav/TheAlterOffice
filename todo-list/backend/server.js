const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors');
app.use(cors());
let tasks=[];
app.post('/add',(req,res)=>{
    const task=req.body.task;
    tasks.push(task);
    res.send('task added');
});
app.get('/list',(req,res)=>{
    res.json(tasks);
});
app.delete('/remove',(req,res)=>{
    const taskToRemove=req.body.task;
    tasks=tasks.filter(t=>t!==taskToRemove);
    res.send('task removed');
});
app.patch('/edit',(req,res)=>{
    const oldTask=req.body.oldtask;
    const newTask=req.body.newtask;
    const index = tasks.indexOf(oldTask);
    tasks[index] = newTask;
    res.send('task updated');
});
app.listen(3001,()=>  console.log("server started"));