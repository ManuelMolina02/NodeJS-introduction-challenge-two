const express = require('express');
const cors = require('cors');

const { v4: uuidv4, validate } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  {
    "name": "Tiagon",
    "username": "alotiago",
    "pro": false,
    "id": "18c34864-e468-4c97-abdc-e0bc8f7247bc",
    "todos": [
      {
        "id": "00827531-b416-42ab-bc54-06db50d8dd95",
        "title": "comprar pc",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:16.564Z"
      }
    ]
  },
  {
    "name": "Manuelso",
    "username": "opamanu",
    "pro": true,
    "id": "5f2d5a20-dc42-4c6d-a211-daabbbbf4463",
    "todos": [
      {
        "id": "f1d1911c-3b09-4d70-8943-188207302a1b",
        "title": "arrumar carro",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:29.818Z"
      },
      {
        "id": "a20a35e7-ad56-4367-99c1-1fb36fa26fb5",
        "title": "pintar casa",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:33.666Z"
      },
      {
        "id": "be25dbfe-9539-4ee4-b892-c50054fd5526",
        "title": "teste todo",
        "deadline": "2021-02-03T00:00:00.000Z",
        "done": false,
        "created_at": "2021-03-19T17:51:05.987Z"
      },
      {
        "id": "a20a35e7-ad56-4367-99c1-1fb36fa26fb5",
        "title": "pintar casa",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:33.666Z"
      },
      {
        "id": "f1d1911c-3b09-4d70-8943-188207302a1b",
        "title": "arrumar carro",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:29.818Z"
      },
      {
        "id": "a20a35e7-ad56-4367-99c1-1fb36fa26fb5",
        "title": "pintar casa",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:33.666Z"
      },
      {
        "id": "f1d1911c-3b09-4d70-8943-188207302a1b",
        "title": "arrumar carro",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:29.818Z"
      },
      {
        "id": "a20a35e7-ad56-4367-99c1-1fb36fa26fb5",
        "title": "pintar casa",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:33.666Z"
      },
      {
        "id": "f1d1911c-3b09-4d70-8943-188207302a1b",
        "title": "arrumar carro",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:29.818Z"
      },
      {
        "id": "a20a35e7-ad56-4367-99c1-1fb36fa26fb5",
        "title": "pintar casa",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:33.666Z"
      },
      {
        "id": "f1d1911c-3b09-4d70-8943-188207302a1b",
        "title": "arrumar carro",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:29.818Z"
      },
      {
        "id": "a20a35e7-ad56-4367-99c1-1fb36fa26fb5",
        "title": "pintar casa",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:33.666Z"
      }
    ]
  }
];

//Validar username de 'user', se existir buscar dados || OK
function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  //console.log('Return: username of req.headers | ', username);

  const user = users.find(user => user.username === username);
  //console.log('Return: "user" of array users where id of req.headers is true | ', user);

  if (!user) {
    return response.json({ error: 'User not found' }).status(404);
  }

  request.user = user

  return next();

}

//Validar se usuario esta habilitado a adicionar novos to-dos || OK
function checksCreateTodosUserAvailability(request, response, next) {
  const { user } = request;
  //console.log('Return: user object | ', user);
  //console.log('Return: user object of "todos" | ', user.todos);

  //console.log('Return: access Free is valid? | ', (user.todos.length < 10 && user.pro === false));
  //console.log('Return: access Pro is valid? | ', (user.pro === true));

  if ((user.todos.length < 10 && user.pro === false) || (user.pro === true)) {
    return next();
  }

  return response.json({ error: "Your user is not authorized!" }).status(403);
}

//Validar se todo existe
function checksTodoExists(req, res, next) {
  const { username } = req.headers;
  const { id } = req.params;
  // console.log('Return: username req.headers | ', username);
  // console.log('Return: id req.params | ', id);

  const user = users.find(user => user.username === username);
  //console.log('Return: user do find | ', user);
  if (!user) {
    return res.status(404).json({ error: 'User is not valid!' });
  } else if (!validate(id)) {
    return res.status(400).json({ error: 'ID this TODO is not valid' });
  }

  const todo = user.todos.find(todo => todo.id === id);
  //console.log('Return: todo do req.params | ', todo);

  if (!todo) {
    return res.status(404).json({ error: "Todo not exists!" })
  }

  req.user = user;
  req.todo = todo;

  // console.log('Return: passei', user)
  // console.log('Return: passei', todo)

  return next();
}

//Validar ID de 'user', se existir buscar dados || OK
function findUserById(request, response, next) {

  const { id } = request.params;
  // console.log('Return: id of req.params | ', id)

  const userID = users.find(user => user.id === id);
  //console.log('Return: userID of req.params | ', userID)


  if (!userID) {
    return response.json({ error: 'User ID not found' }).status(404);
  }

  request.user = userID

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const usernameAlreadyExists = users.some((user) => user.username === username);

  if (usernameAlreadyExists) {
    return response.status(400).json({ error: 'Username already exists' });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    pro: false,
    todos: []
  };

  users.push(user);

  return response.status(201).json(user);
});

//Ver todos os Usuários
app.get('/users', (request, response) => {
  //console.log('Return: users table | ', users)
  return response.json(users);
});


//Ver 1 Usuário
app.get('/users/:id', findUserById, (request, response) => {
  const { user } = request;
  console.log('Return: user object | ', user)

  return response.json(user);
});

app.patch('/users/:id/pro', findUserById, (request, response) => {
  const { user } = request;

  if (user.pro) {
    return response.status(400).json({ error: 'Pro plan is already activated.' });
  }

  user.pro = true;

  return response.json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, checksCreateTodosUserAvailability, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const newTodo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,
    created_at: new Date()
  };

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

app.put('/todos/:id', checksTodoExists, (request, response) => {
  const { title, deadline } = request.body;
  const { todo } = request;

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

app.patch('/todos/:id/done', checksTodoExists, (request, response) => {
  const { todo } = request;

  todo.done = true;

  return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, checksTodoExists, (request, response) => {
  const { user, todo } = request;

  const todoIndex = user.todos.indexOf(todo);

  if (todoIndex === -1) {
    return response.status(404).json({ error: 'Todo not found' });
  }

  user.todos.splice(todoIndex, 1);

  return response.status(204).send();
});

module.exports = {
  app,
  users,
  checksExistsUserAccount,
  checksCreateTodosUserAvailability,
  checksTodoExists,
  findUserById
};