import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Landing } from "./components/Landing";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar-content">
            <Link className="navbar-content-title" to="/">AWS Cognito React Starter</Link>
            <div className="navbar-content-links">
              <a href="#">Log in</a>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
