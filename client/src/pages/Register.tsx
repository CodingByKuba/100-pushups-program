import { Button, TextField } from "@mui/material";
import CenterFlexBox from "../components/CenterFlexBox";
import { useRef } from "react";
import { useFetchContext } from "../context/FetchContext";
import { AxiosRoutes } from "../data/enums";

const Register = () => {
  const { isPending, fetchCallback } = useFetchContext();

  const emailRef: React.MutableRefObject<any> = useRef(null);
  const passwordRef: React.MutableRefObject<any> = useRef(null);
  const repeatPasswordRef: React.MutableRefObject<any> = useRef(null);

  const handleRegister = (e: any) => {
    e.preventDefault();
    fetchCallback({
      url: AxiosRoutes.ACCOUNT,
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
          inputRef={emailRef}
          type="email"
          label="E-mail..."
          variant="outlined"
        />
        <TextField
          inputRef={passwordRef}
          type="password"
          label="Password..."
          variant="outlined"
        />
        <TextField
          inputRef={repeatPasswordRef}
          type="password"
          label="Repeat password..."
          variant="outlined"
        />
        <Button variant="contained" type="submit" disabled={isPending}>
          Sign Up
        </Button>
      </form>
    </CenterFlexBox>
  );
};

export default Register;
