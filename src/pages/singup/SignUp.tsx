import { Avatar, Box, Container } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { RegisterUser } from "../../interfaces/user";
import { signUpNewUser } from "../../api/axios.controller";
import { useNavigate } from "react-router-dom";
import { LOGIN_REGEX, PWD_REGEX } from "../../regex";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: RegisterUser = {
      username,
      password,
      // confirmPassword,
    };
    try {
      await signUpNewUser(user);
      navigate("/sign-in");
    } catch (error) {
      navigate("/500");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                error={username !== "" && LOGIN_REGEX.test(username) === false}
                helperText={
                  LOGIN_REGEX.test(username) === false && username
                    ? "username must contain at least 4 characters, start with a letter and can contain only letters, numbers, underscores and hyphens"
                    : ""
                }
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
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                error={password !== "" && PWD_REGEX.test(password) === false}
                helperText={
                  PWD_REGEX.test(password) === false && password
                    ? "Password must contain at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                    : ""
                }
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
                autoComplete="confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword !== "" && password !== confirmPassword}
                helperText={
                  confirmPassword !== "" && password !== confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
