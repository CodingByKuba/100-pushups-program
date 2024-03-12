import { Button } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { UserReducerActions } from "../data/enums";

const Account = () => {
  const { userDispatch, setMemoryAuthToken } = useUserContext();

  const handleLogout = () => {
    setMemoryAuthToken("");
    userDispatch({ type: UserReducerActions.RESET });
  };

  return (
    <div>
      Account page
      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Account;
