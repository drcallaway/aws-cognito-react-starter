import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AuthProvider, AuthIsSignedIn, AuthIsNotSignedIn } from "./auth/authUtil";
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
    <Box>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ textDecoration: "none" }}
                color="inherit"
              >
                AWS Cognito React Starter
              </Typography>
              <Typography sx={{ flexGrow: 1 }}></Typography>
              <AuthIsNotSignedIn>
                <Button color="inherit" component={Link} to="/signin">Sign In</Button>
                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
              </AuthIsNotSignedIn>
              <AuthIsSignedIn>
                <Button color="inherit" component={Link} to="/changePassword">Change Password</Button>
                <Button color="inherit" component={Link} to="/signout">Sign Out</Button>
              </AuthIsSignedIn>
            </Toolbar>
          </AppBar>
          <Box margin="20px auto" width="1200px">
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
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </Box>
  );
}

export default App;
