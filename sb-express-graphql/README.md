- Initiate a Node project:
`npm init -y`

- Configure Node scripts in `package.json`:
```json
  "scripts": {
    "dev": "nodemon",
  },
```

- Install dev dependencies:
`npm i --save-dev nodemon`

- Install dependencies:
`npm i --save body-parser express express-graphql graphql lodash`

- Build:
`npm build`

- Serve watching modifications in files:
`npm run dev`

- Access [http://localhost:3000/graphql](http://localhost:3000/graphql)

- GraphQL examples:
```graphql
# Query Todos
query QueryTodos {
  todos {
    userId
    title
    completed
  }
}

# Create a new Todo
mutation CreateTodo {
  createTodo(todoInput: { userId: "1", title: "Teste", completed: true }) {
    id
  }
}
```
