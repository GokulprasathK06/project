const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { text } = req.body;
    if (text) {
        const newTask = { id: tasks.length + 1, text, completed: false };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } else {
        res.status(400).json({ error: 'Task text is required.' });
    }
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.text;
    const task = tasks.find(t => t.id === taskId);

    if (task && updatedText) {
        task.text = updatedText;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found or invalid update data.' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Task not found.' });
    }
});

app.patch('/tasks/:id/complete', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
