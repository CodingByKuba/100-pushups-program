import { Button, TextField } from "@mui/material";
import CenterFlexBox from "../CenterFlexBox";
import { useRef } from "react";
import { useFetchContext } from "../../context/FetchContext";

const Register = () => {
  const { fetchCallback } = useFetchContext();

  const emailRef: React.MutableRefObject<any> = useRef(null);
  const passwordRef: React.MutableRefObject<any> = useRef(null);
  const repeatPasswordRef: React.MutableRefObject<any> = useRef(null);

  const handleRegister = (e: any) => {
    e.preventDefault();
    console.log();
    fetchCallback({
      url: "/account",
      payload: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        repeatPassword: repeatPasswordRef.current.value,
      },
      successCallback: (response: any) => console.log(response),
      errorCallback: (error: any) => console.log(error),
    });
  };

  return (
    <CenterFlexBox>
      <form id="login-form" onSubmit={handleRegister}>
        <span>Create new account</span>
        <TextField
          ref={emailRef}
          type="email"
          label="E-mail..."
          variant="outlined"
        />
        <TextField
          ref={passwordRef}
          type="password"
          label="Password..."
          variant="outlined"
        />
        <TextField
          ref={repeatPasswordRef}
          type="password"
          label="Repeat password..."
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </CenterFlexBox>
  );
};

export default Register;
