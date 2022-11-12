import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import {
  AuthProvider,
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from "./auth/authUtil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import Landing from "./components/Landing";
import Console from "./components/Dashboard";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";
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
                  <Link to="/signin">Sign In</Link>
                  <Link to="/signup">Sign Up</Link>
                </AuthIsNotSignedIn>
                <AuthIsSignedIn>
                  <Link to="/changePassword">Change Password</Link>
                  <Link to="/signout">Sign Out</Link>
                </AuthIsSignedIn>
              </div>
            </div>
          </nav>
          <div className="content">
            <AuthIsNotSignedIn>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AuthIsNotSignedIn>
            <AuthIsSignedIn>
              <Routes>
                <Route path="/console" element={<Console />} />
                <Route path="/signout" element={<SignOut />} />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route path="*" element={<Navigate to="/console" replace />} />
              </Routes>
            </AuthIsSignedIn>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
