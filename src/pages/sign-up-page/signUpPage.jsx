import { useState } from "react";
import { createUser } from "../../service/api";
import { Button, Container, TextField, Typography } from "@mui/material";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUpSubmit = async () => {
    try {
      const response = await createUser(name, email, password);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ my: "32px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Sign Up Here
      </Typography>
      <TextField
        fullWidth
        label="Name"
        margin="normal"
        required
        value={name}
        onChange={(e) => {
          onChangeName(e);
        }}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        required
        value={email}
        onChange={(e) => {
          onChangeEmail(e);
        }}
      />
      <TextField
        fullWidth
        label="Password"
        margin="normal"
        required
        value={password}
        onChange={(e) => {
          onChangePassword(e);
        }}
      />
      <Button
        onClick={() => {
          SignUpSubmit();
        }}
        color="primary"
        sx={{ border: "1px solid black", mt: "16px" }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Signup;