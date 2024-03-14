import { Button } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { AxiosRoutes, UserReducerActions } from "../data/enums";
import { useFetchContext } from "../context/FetchContext";

const Account = () => {
  const { userState, userDispatch, setMemoryAuthToken, setMemoryAutoLogin } =
    useUserContext();
  const { fetchCallback } = useFetchContext();

  const handleLogout = () => {
    fetchCallback({
      url: AxiosRoutes.LOGIN,
      method: "PUT",
      payload: {
        token: userState.authToken,
      },
      successCallback: (response: any) => {
        console.log(response);
      },
      errorCallback: (error: any) => {
        console.log(error);
      },
      finallyCallback: () => {
        setMemoryAutoLogin(false);
        setMemoryAuthToken("");
        userDispatch({ type: UserReducerActions.RESET });
      },
    });
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
