document.addEventListener('DOMContentLoaded', function () {
    const tasksContainer = document.getElementById('tasks-container');
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    fetchTasks();

    function fetchTasks() {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(tasks => displayTasks(tasks))
            .catch(error => console.error('Error fetching tasks:', error));
    }

    function displayTasks(tasks) {
        tasksContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.innerHTML = `
                <span>${task.text}</span>
                <button onclick="updateTask(${task.id})">Update</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="completeTask(${task.id})">Complete</button>
            `;
            tasksContainer.appendChild(taskElement);
        });
    }

    function addTask(text) {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
            .then(response => response.json())
            .then(newTask => {
                fetchTasks();
            })
            .catch(error => console.error('Error adding task:', error));
    }

    function updateTask(id) {
        // Implement update 

        const updatedText=prompt('Enter updated task text:');
        if(updatedText!==null){
            fetch(`/tasks/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text:updatedText }),
            })
            .then(response => response.json())
            .then(newTask => {
                fetchTasks();
            })
            .catch(error => console.error('Error Updating task:', error));
        } 
        
    }

    function deleteTask(id) {
        const confirmDelete=confirm('Are you sure you want to delete this task?');
        if(confirmDelete){
            fetch(`/tasks/${id}`,{
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(newTask => {
                fetchTasks();
            })
            .catch(error => console.error('Error deleting task:', error));
        }
    }

    function completeTask(id) {
        fetch(`/tasks/${id}`,{
            method:'PATCH',
        })
        .then(response => response.json())
        .then(newTask => {
            fetchTasks();
        })
        .catch(error => console.error('Error Completing task:', error));
    }
});