import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthUtil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Landing from "./components/Landing";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <nav className="navbar">
            <div className="navbar-content">
              <Link className="navbar-content-title" to="/">AWS Cognito React Starter</Link>
              <div className="navbar-content-links">
                <Link to="/signin">Sign in</Link>
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
