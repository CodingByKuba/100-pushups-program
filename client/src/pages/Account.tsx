import { Button } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { AxiosRoutes, UserReducerActions } from "../data/enums";
import { useFetchContext } from "../context/FetchContext";
import { useEffect } from "react";

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

  useEffect(() => {
    fetchCallback({
      url: AxiosRoutes.ACCOUNT,
      method: "GET",
      successCallback: (response: any) => {
        if (response.data.error) return console.log(response.data.error);
        console.log(response.data);
      },
      errorCallback: (error: any) => console.log(error),
    });
  }, []);

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
