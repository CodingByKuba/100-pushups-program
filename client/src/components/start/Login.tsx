import { Button, Checkbox, TextField } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import CenterFlexBox from "../CenterFlexBox";

const Login = () => {
  const {
    memoryLogin,
    memoryPassword,
    memoryRememberPassword,
    memoryAutoLogin,
  } = useUserContext();

  return (
    <CenterFlexBox>
      <form id="login-form">
        <span>Sign in to your account</span>
        <TextField
          type="email"
          label="E-mail..."
          variant="outlined"
          defaultValue={memoryRememberPassword ? memoryLogin || "" : ""}
        />
        <TextField
          type="password"
          label="Password..."
          variant="outlined"
          defaultValue={memoryRememberPassword ? memoryPassword || "" : ""}
        />
        <div>
          <Checkbox checked={memoryRememberPassword || false} /> Remember me
        </div>
        <div>
          <Checkbox checked={memoryAutoLogin || false} /> Auto login
        </div>
        <Button variant="contained">Sign In</Button>
      </form>
    </CenterFlexBox>
  );
};

export default Login;
