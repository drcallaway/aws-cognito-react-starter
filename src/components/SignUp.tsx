import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/authUtil";
import { useValidEmail, useValidPassword } from "../auth/hooks";
import { resendConfirmationCode } from "../auth/cognito";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, setEmail, emailIsValid } = useValidEmail(location.state?.email);
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordIsValid,
    confirmPasswordIsValid,
  } = useValidPassword();
  const [created, setCreated] = useState(!!email);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [working, setWorking] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const authContext = useContext(AuthContext);
  const hasInvalidPassword = !!password && !passwordIsValid;

  useEffect(() => {
    setButtonEnabled(emailIsValid && passwordIsValid && confirmPasswordIsValid && !working);
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid, working]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setWorking(true);
      setError("");
      await authContext.signUpWithEmail(email, email, password);
      setCreated(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setWorking(false);
    }
  };

  const handleVerify = async () => {
    try {
      setWorking(true);
      await authContext.verifyCode(email, code);
      navigate("/signin?newAccount");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setWorking(false);
    }
  };

  const signup = (
    <>
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
          Sign up
        </Typography>
        {error && (
          <Box mt={2}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus={true}
                error={!!email && !emailIsValid}
                value={email}
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setEmail(evt.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={hasInvalidPassword ? "Password (8+ characters with uppercase, lowercase, and number)" : "Password"}
                type="password"
                id="password"
                error={hasInvalidPassword}
                value={password}
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setPassword(evt.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                error={!!password && !confirmPasswordIsValid}
                value={confirmPassword}
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setConfirmPassword(evt.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!buttonEnabled}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );

  const resendCode = async () => {
    try {
      await resendConfirmationCode(email);
      alert(`Code resent to ${email}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const verify = (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography component="h1" variant="h5">Verify Account</Typography>
      <Alert severity="info">Verify code sent to {email}</Alert>
      {error && (
        <Box mt={2}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </Box>
      )}
      <Box mt={4} display="flex" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          label="Code"
          error={code.length > 0 && code.length < 6}
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCode(evt.target.value);
          }}
        />
        <Button sx={{ml: "10px", flexShrink: "0"}} onClick={handleVerify} color="primary" variant="contained" disabled={working}>
          Send Code
        </Button>
      </Box>
      <Link component="button" variant="body2" onClick={resendCode} sx={{marginTop: 1}}>
        Resend code
      </Link>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {created ? verify : signup}
      </Container>
    </ThemeProvider>
  );
}
