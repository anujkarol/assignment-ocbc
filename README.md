# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `API`
API used as provided in postman collection
Please use commands below to use mockservices under [index.tsx] filder in src folder
## `Uncomment below code` in src/index.tsx to run in mock environment
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

#### `API BASE url is set in .env `
[http://localhost:8080] (http://localhost:8080)


#### `Routes implemented `
1. Login
2. Dashboard
3. Transfer
4. Balance
5. payee
6. Transactions
7. Register (route not available sp dummy route implemented)



#### `Test Covergae`
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |   73.06 |    62.06 |   68.75 |   73.06 |                   
 src                    |       0 |        0 |       0 |       0 |                   
  App.tsx               |       0 |      100 |       0 |       0 | 12-29             
  Layout.tsx            |       0 |      100 |       0 |       0 | 4-5               
  index.tsx             |       0 |        0 |     100 |       0 | 6-23              
  reportWebVitals.ts    |       0 |        0 |       0 |       0 | 3-10              
  styles.ts             |       0 |      100 |     100 |       0 | 3
 src/Login              |   97.67 |       90 |      80 |   97.67 | 
  index.tsx             |    97.5 |       90 |      80 |    97.5 | 97
  state.ts              |     100 |      100 |     100 |     100 | 
  styles.ts             |     100 |      100 |     100 |     100 | 
 src/MakeTransferForm   |      45 |    13.63 |   52.94 |      45 | 
  Completion.tsx        |     100 |      100 |     100 |     100 | 
  Transfer.tsx          |       0 |        0 |       0 |       0 | 33-122
  index.tsx             |   73.91 |       25 |   85.71 |   73.91 | 47-49,78-79,90-91
  state.ts              |       0 |      100 |     100 |       0 | 1
  styles.ts             |   93.33 |       25 |      50 |   93.33 | 64
 src/Register           |   65.78 |     37.5 |     100 |   65.78 | 
  index.tsx             |   61.76 |     37.5 |     100 |   61.76 | 50-70,84
  state.ts              |     100 |      100 |     100 |     100 | 
  styles.ts             |     100 |      100 |     100 |     100 | 
 src/components/Button  |     100 |        0 |     100 |     100 | 
  index.tsx             |     100 |        0 |     100 |     100 | 18
  style.ts              |     100 |      100 |     100 |     100 | 
 src/components/Input   |     100 |      100 |     100 |     100 | 
  index.tsx             |     100 |      100 |     100 |     100 | 
  handlers.ts           |   71.42 |      100 |      60 |   71.42 | 60-82
  server.ts             |     100 |      100 |     100 |     100 |
 src/utils              |     100 |       96 |     100 |     100 |
  formattedNumber.ts    |     100 |        0 |     100 |     100 | 1
  validateLogin.ts      |     100 |      100 |     100 |     100 |
  validateRegister.ts   |     100 |      100 |     100 |     100 |
  validateTransfer.ts   |     100 |      100 |     100 |     100 |
------------------------|---------|----------|---------|---------|-------------------



