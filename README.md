# 🚀 Challenge Two - Ignite | Working with Middlewares

## 🔭 Sobre o desafio
 Neste desafio utilizamos a mesma estrutura de rotas presentes no desafio anterior onde a proposta é de gerenciar tarefas, porém, a segunda fase será focada na utilização de  middlewares a lógica segue sendo a criação de um usuário com `name` e `username`, bem como fazer o CRUD de *todos*:
 
- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

Tudo isso para cada usuário em específico (o `username` será passado pelo header). Além disso, dessa vez teremos um plano grátis onde o usuário só pode criar até dez todos e um plano Pro que irá permitir criar todos ilimitados, isso tudo usando middlewares para fazer as validações necessárias.


## ⚠ Validação de Requisitos:

### 📡 Testes dos Middlewares
- *Should be able to find user by username in header and pass it to request.user*
- *Should not be able to find a non existing user by username in header*
- *Should be able to let user create a new todo when is in free plan and have less than ten todos*
- *Should not be able to let user create a new todo when is not Pro and already have ten todos*
- *Should be able to let user create infinite new todos when is in Pro plan*
- *Should be able to let user create infinite new todos when is in Pro plan*
- *Should be able to put user and todo in request when both exits*
- *Should not be able to put user and todo in request when user does not exists*
- *Should not be able to put user and todo in request when todo id is not uuid*
- *Should be able to find user by id route param and pass it to request.user*
- *Should not be able to pass user to request.user when it does not exists*


## 🧰 Methods and Parameters used

### 🔧 Types of Parameters

- *Route Params* - Necessário para identificar um recurso editar/ deletar/ buscar

- *Query Params* - São utilizados em momentos de páginação, filtros 

- *Body Params* - Os objetos de inserção ou alteração (JSON)


### ⚙ Methods JavaScript of Activities

 - [find()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find) - [retorna dado do 1° elemento correspondente]
    - Demonstração:
          🔷  🔶  🔵  🔴  -  find(🔵) = 🔵
          
          

## 🤔 Como rodar o projeto?

- Faça um clone desse repositório;
- Acesse o local desejado através do terminal e digite: 
```sh
git clone https://github.com/ManuelMolina02/NodeJS-introduction-challenge-one.git
```
Após baixar o projeto, acesse ele via seu terminal rode os comandos:

```sh
yarn install
yarn dev
```
Ou se quiser rodar os testes de validação, via seu terminal rode o comando:
```sh
yarn test
```


Feito com 💜 por Manuel Molina 👋 Me contate através do [LinkedIn!](https://www.linkedin.com/in/manuel-angel-berger-molina-ba08b3174/)
