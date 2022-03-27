import "./App.css";

import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Author } from "./component/Author";
import { Books } from "./component/Book";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />

          <hr />
          <Routes>
            <Route path="/books" element={<Books />}></Route>
            <Route path="/authors" element={<Author />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
