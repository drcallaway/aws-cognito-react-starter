import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { getEmailAddress, setEmailAddress } from "../util/localStorage";
import { AuthContext } from "../auth/authUtil";
import { useValidEmail, useValidPassword } from "../auth/hooks";
import { resendConfirmationCode } from "../auth/cognito";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const storedEmail = getEmailAddress();
  const { email, setEmail, emailIsValid } = useValidEmail(storedEmail);
  const {
    password,
    setPassword,
    passwordIsValid,
  } = useValidPassword();
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!storedEmail);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setButtonEnabled(emailIsValid && passwordIsValid && !working);
  }, [emailIsValid, passwordIsValid, working]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));

    try {
      setWorking(true);
      await authContext.signInWithEmail(email, password);
      navigate("/console");
    } catch (err) {
      if (err instanceof Error) {
        let message = err.message;
        if (err.name === "UserNotConfirmedException") {
          try {
            await resendConfirmationCode(email);
            navigate("/signup", { replace: true, state: { email }});      
          } catch (err) {
            if (err instanceof Error) {
              message = err.message;
            }
          }
        }
        setError(message);
      } else {
        setError("Unknown error. Please try again later.");
      }
      setPassword(""); //clear password
    } finally {
      setWorking(false);
      setEmailAddress(rememberMe ? email : "");
    }
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {location.search.includes("newAccount") && <Alert severity="info">Account created. Sign in with your new credentials.</Alert>}
          {error && (
            <Box mt={2}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!email && !emailIsValid}
              autoFocus={!storedEmail}
              value={email}
              onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                setEmail(evt.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus={!!storedEmail}
              error={!!password && !passwordIsValid}
              value={password}
              onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                setPassword(evt.target.value);
              }}
          />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={handleCheck} />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!buttonEnabled} >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
