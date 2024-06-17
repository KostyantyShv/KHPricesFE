import React, { useState } from 'react'
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { LOGIN_REGEX } from '../../regex';

const MyProfile = () => {
  const { currentUser } = JSON.parse(
    localStorage.getItem("autorized") as string
  );
  const [username, setLogin] = useState(currentUser.username);
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const user = {
  //     username,
  //     // password,
  //   };
  //   try {
  //     const {
  //       access_token, userData
  //        } = await signInUser(user);
  //     console.log(userData);

  //     localStorage.setItem(
  //       "autorized",
  //       JSON.stringify({
  //         currentUser: {
  //           username: userData.username,
  //           token: access_token,
  //           role: userData.roleId,
  //           userId: userData.id,
  //         },
  //       })
  //     );
  //     navigate("/");
  //     window.location.reload();
  //   } catch (error) {
  //     // Handle or throw the error as needed
  //     console.error("Error fetching users:", error);
  //     throw error;
  //   }
  // };

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
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Box sx={{ flexGrow: 1, display: { xs: "flex"}, alignItems: "center", justifyContent: "space-between" }}>

        <Typography component="h1" variant="h4">
          {currentUser.username}
        </Typography>
        <Typography component="h1" variant="h5" sx={{ml: 2}} className='text-gray-400'>
          {currentUser.role === 2 ? "Admin" : "User"}
        </Typography>
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            defaultValue={currentUser.username}
            onChange={(e) => setLogin(e.target.value)}
            error={username !== "" && LOGIN_REGEX.test(username) === false}
            helperText={
              LOGIN_REGEX.test(username) === false && username
                ? "username must contain at least 4 characters, start with a letter and can contain only letters, numbers, underscores and hyphens"
                : ""
            }
          />
          <Button
            href='https://www.mil.gov.ua/kontakti/oblasni-vijskomati.html'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Values
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default MyProfile