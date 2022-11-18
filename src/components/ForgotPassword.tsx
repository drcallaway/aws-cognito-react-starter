import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authUtil";
import { useValidEmail, useValidPassword } from "../auth/hooks";

const theme = createTheme();

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, setEmail, emailIsValid } = useValidEmail();
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordIsValid,
    confirmPasswordIsValid,
  } = useValidPassword();
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    setButtonEnabled(
      !working &&
        ((!resetCode && emailIsValid) ||
          (!!resetCode && emailIsValid && passwordIsValid && confirmPasswordIsValid))
    );
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid, working]);

  const sendResetCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setWorking(true);
      await authContext.sendCode(email);
      setCodeSent(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setWorking(false);
    }
  };

  const submitNewPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setWorking(true);
      await authContext.forgotPassword(email, resetCode, password);
      navigate("/signin");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setWorking(false);
    }
  };

  const sendCodeForm = (
    <Box component="form" onSubmit={sendResetCode} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        error={!emailIsValid}
        autoFocus
        value={email}
        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
          setEmail(evt.target.value);
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!buttonEnabled}
      >
        Request Reset Code
      </Button>
    </Box>
  );

  const resetPasswordForm = (
    <>
      <Alert severity="info">Reset code sent to {email}</Alert>
      <Box component="form" onSubmit={submitNewPassword} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="resetCode"
              label="Reset Code"
              name="resetCode"
              error={!resetCode || resetCode.length !== 6}
              value={resetCode}
              inputProps={{ maxLength: 6 }}
              onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                setResetCode(evt.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={!!password && !passwordIsValid}
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
          Change Password
        </Button>
      </Box>
    </>
  );

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
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {error && (
            <Box mt={2}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
          )}
          {codeSent ? resetPasswordForm : sendCodeForm}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
