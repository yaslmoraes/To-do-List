const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Criar um modelo de tarefa com campo Concluido 
const Task = mongoose.model('Task', new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },  // Campo para verificar se a tarefa foi concluída
}));

// Configurar middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rota inicial
app.use(express.static(path.join(__dirname, '../front')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'index.html'));
  });

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

    // Rota para pegar todas as tarefas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

// Rota para atualizar a tarefa
app.patch('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findByIdAndUpdate(taskId, { completed: req.body.completed }, { new: true });
  res.json(task);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
