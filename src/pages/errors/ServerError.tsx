import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Error from "../../components/Error/Error";

export const ServerError = () => {
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
        <Error statusCode={500} errorMessage={"Internal Server Error"} />
      </Box>
    </Container>
  );
};
