import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/1authUtil";
import { useValidPassword } from "../auth/hooks";

const theme = createTheme();

export default function ChangePassword() {
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordIsValid,
    confirmPasswordIsValid,
  } = useValidPassword();
  const {
    password: oldPassword,
    setPassword: setOldPassword,
    passwordIsValid: oldPasswordIsValid,
  } = useValidPassword();
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    setButtonEnabled(!working && oldPasswordIsValid && passwordIsValid && confirmPasswordIsValid);
  }, [oldPasswordIsValid, passwordIsValid, confirmPasswordIsValid, working]);

  const submitNewPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setWorking(true);
      await authContext.changePassword(oldPassword, password);
      navigate("/console");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setWorking(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          {error && (
            <Box mt={2}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
          )}
          <Box component="form" onSubmit={submitNewPassword} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="oldPassword"
                  label="Old Password"
                  type="password"
                  id="oldPassword"
                  error={!!oldPassword && !oldPasswordIsValid}
                  value={oldPassword}
                  onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setOldPassword(evt.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
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
                  label="Confirm New Password"
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}
