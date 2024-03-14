import { Button, Checkbox, TextField } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import CenterFlexBox from "../components/CenterFlexBox";
import { useFetchContext } from "../context/FetchContext";
import { useRef } from "react";
import { AxiosRoutes, UserReducerActions } from "../data/enums";

const Login = () => {
  const {
    memoryEmail,
    memoryPassword,
    memoryPasswordRemember,
    memoryAutoLogin,
    setMemoryEmail,
    setMemoryPassword,
    setMemoryPasswordRemember,
    setMemoryAutoLogin,
    setMemoryAuthToken,
    userDispatch,
  } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();

  const emailRef: React.MutableRefObject<any> = useRef(null);
  const passwordRef: React.MutableRefObject<any> = useRef(null);
  const autoLoginRef: React.MutableRefObject<any> = useRef(null);

  const handleLogin = (e: any) => {
    e.preventDefault();
    fetchCallback({
      url: AxiosRoutes.LOGIN,
      payload: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      successCallback: (response: any) => {
        if (response.data.error) return console.log(response.data.error);
        if (response.data.token) {
          if (autoLoginRef.current.checked) {
            setMemoryAutoLogin(true);
          }
          setMemoryAuthToken(response.data.token);
          userDispatch({
            type: UserReducerActions.SET_AUTH_TOKEN,
            payload: response.data.token,
          });
        }
      },
      errorCallback: (error: any) => console.log(error),
    });
  };

  return (
    <CenterFlexBox>
      <form id="login-form" onSubmit={handleLogin}>
        <span>Sign in to your account</span>
        <TextField
          type="email"
          label="E-mail..."
          inputRef={emailRef}
          variant="outlined"
          defaultValue={memoryPasswordRemember ? memoryEmail || "" : ""}
          onChange={(e) => {
            if (memoryPasswordRemember) setMemoryEmail(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="Password..."
          inputRef={passwordRef}
          variant="outlined"
          defaultValue={memoryPasswordRemember ? memoryPassword || "" : ""}
          onChange={(e) => {
            if (memoryPasswordRemember) setMemoryPassword(e.target.value);
          }}
        />
        <div>
          <Checkbox
            checked={memoryPasswordRemember || false}
            onChange={(e) => {
              setMemoryPasswordRemember(e.target.checked);
              setMemoryEmail(e.target.checked ? emailRef.current.value : "");
              setMemoryPassword(
                e.target.checked ? passwordRef.current.value : ""
              );
              if (!e.target.checked) setMemoryAutoLogin(false);
            }}
          />{" "}
          Remember me
        </div>
        <div>
          <Checkbox
            defaultChecked={memoryAutoLogin || false}
            inputRef={autoLoginRef}
          />{" "}
          Auto login
        </div>
        <Button variant="contained" type="submit" disabled={isPending}>
          Sign In
        </Button>
      </form>
    </CenterFlexBox>
  );
};

export default Login;
