Initiate a Node project:
`npm init -y`

Configure Node scripts in `package.json`:

```
  "scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "tsc -p ."
  },
```

Install dev dependencies:
`npm i --save-dev nodemon`

Install dependencies:
`npm i --save body-parser express express-graphql graphql lodash`

Build:
`npm run build`

Serve watching modifications in files:
`npm run dev`

GraphQL:

Access [http://localhost:3000/graphql](http://localhost:3000/graphql)

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
