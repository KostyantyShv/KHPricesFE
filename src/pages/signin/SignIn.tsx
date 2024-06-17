import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signInUser } from "../../api/axios.controller";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };
    try {
      const {
        access_token, userData
         } = await signInUser(user);
      console.log(userData);

      localStorage.setItem(
        "autorized",
        JSON.stringify({
          currentUser: {
            username: userData.username,
            token: access_token,
            role: userData.roleId,
            userId: userData.id,
          },
        })
      );
      navigate("/");
      window.location.reload();
    } catch (error) {
      // Handle or throw the error as needed
      console.error("Error fetching users:", error);
      throw error;
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
         Вхід
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setLogin(e.target.value)}
            // error={username !== "" && LOGIN_REGEX.test(username) === false}
            // helperText={
            //   LOGIN_REGEX.test(username) === false && username
            //     ? "username must contain at least 4 characters, start with a letter and can contain only letters, numbers, underscores and hyphens"
            //     : ""
            // }
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
            onChange={(e) => setPassword(e.target.value)}
            // error={password !== "" && PWD_REGEX.test(password) === false}
            // helperText={
            //   PWD_REGEX.test(password) === false && password
            //     ? "Password must contain at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
            //     : ""
            // }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Вхід
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Нема аккаунту? Зареєструватись"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
