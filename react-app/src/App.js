import logo from "./logo.svg";
import "./App.css";

import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/expenses/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
