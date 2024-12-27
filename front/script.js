// Função para adicionar uma nova tarefa
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        // Enviar a tarefa para o servidor
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskText }),
        })
        .then(response => response.json())
        .then(task => {
            // Adicionar a tarefa na lista do front-end
            const li = document.createElement('li');
            li.textContent = task.text;
            
            document.getElementById('taskList').appendChild(li);
        });
    }
    
    taskInput.value = '';  // Limpa o campo de input
});

// Função para carregar tarefas ao iniciar a página
window.onload = function() {
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            
            taskList.appendChild(li);
        });
    });
};

// Função para alternar a conclusão de uma tarefa
function toggleTaskCompletion(e) {
    const taskId = e.target.id;
    
    fetch(`/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
    })
    .then(response => response.json())
    .then(task => {
        e.target.classList.add('completed');  // Adiciona a classe 'completed' à tarefa
    });
}




  


  

  
  