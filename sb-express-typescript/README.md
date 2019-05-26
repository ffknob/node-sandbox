Install Typescript globally:
`npm install -g typescript`

Initiate Typescript configuration:
`tsc --init`

Initiate a Node project:
`npm init -y`

Change some of the Typescript configuration options in `tsconfig.json`:
```
"target": "es6"
"outDir": "./dist"
"rootDir": "./src"
"moduleResolution": "node"
```

Configure Node scripts in `package.json`:
```
  "scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "tsc -p ."
  },
```

Install dev dependencies:
`npm i --save-dev typescript nodemon ts-node @types/node @types/express`

Install dependencies:
`npm i --save express`

Build:
`npm run build`

Serve watching modifications in files:
`npm run dev`
