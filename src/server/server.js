const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const todos = [
  { archive: false, id: 1, status: 'active', text: 'Hello, world!' },
  { archive: false, id: 2, status: 'complete', text: 'Pick up groceries' }
];

function filteredTodos() {
  return todos.filter(todo => todo.status !== 'deleted');
}

app.get('/todos', (req, res) => {
  res.json(JSON.stringify(filteredTodos()));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });

  res.json(JSON.stringify(todos[index]));
});

app.get('/*', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
});

app.post('/todos', (req, res) => {
  const text = req.body.data.text;

  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

  const id = todos.length + 1;
  const newTodo = { archive: false, id, status: 'active', text };

  todos.push(newTodo);

  res.status(201).json(filteredTodos());
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(todo => {
    return todo.id === parseInt(req.params.id);
  });

  if (index !== -1) {
    todos[index].status = 'deleted';
    res.status(200).json(filteredTodos());
  }
  else {
    res.status(404).send({ message: 'resource not found' });
  }
});

app.put('/todos/:id', (req, res) => {
  const index = todos.findIndex(todo => {
    return todo.id === parseInt(req.params.id);
  });

  if (index !== -1) {
    const { id, ...alterableData } = req.body.data;

    todos[index] = {
      id: todos[index].id,
      ...alterableData,
    }

    res.status(200).json(filteredTodos());
  }
  else {
    res.status(404).send({ message: 'resource not found' });
  }
});

// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
