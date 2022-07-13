import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { createBrowserHistory } from "history";
import { Layout } from "./Layout";
import { Login } from "./Login";
import { MakeTransfer } from "./MakeTransferForm";
import { Completion } from "./MakeTransferForm/Completion";
import { Transfer } from "./MakeTransferForm/Transfer";
import { Register } from "./Register";

const history = createBrowserHistory();
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  body,html,p,h1,h2,h3,h4,h5,h6,h7,ol,li,ul{
    margin:0;
    padding:0
  }
  *{
    box-sizing:border-box
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/maketransfer" element={<MakeTransfer />} />
          <Route path="/completion" element={<Completion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
