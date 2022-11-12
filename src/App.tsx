import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import {
  AuthProvider,
  AuthContext,
  AuthStatus,
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from "./auth/AuthUtil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import Landing from "./components/Landing";
import Console from "./components/Console";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <nav className="navbar">
            <div className="navbar-content">
              <Link className="navbar-content-title" to="/">
                AWS Cognito React Starter
              </Link>
              <div className="navbar-content-links">
                <AuthIsNotSignedIn>
                  <Link to="/signin">Sign in</Link>
                  <Link to="/signup">Sign up</Link>
                </AuthIsNotSignedIn>
                <AuthIsSignedIn>
                  <Link to="/signout">Sign out</Link>
                </AuthIsSignedIn>
              </div>
            </div>
          </nav>
          <div className="content">
            <AuthIsNotSignedIn>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AuthIsNotSignedIn>
            <AuthIsSignedIn>
              <Routes>
                <Route path="/console" element={<Console />} />
                <Route path="/signout" element={<SignOut />} />
              </Routes>
            </AuthIsSignedIn>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
