import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { BrowserRoutes, UserReducerActions } from "../data/enums";
import { useUserContext } from "../context/UserContext";

import Account from "../pages/Account";
import NavigateOnError from "./NavigateOnError";
import Start from "../pages/Start";
import BottomNavBar from "./BottomNavBar";
import Login from "../pages/Login";
import Register from "../pages/Register";

const RoutesManager = () => {
  const { userState, userDispatch, memoryAuthToken } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (memoryAuthToken) {
      userDispatch({
        type: UserReducerActions.SET_AUTH_TOKEN,
        payload: memoryAuthToken,
      });
    }
    if (userState.authToken) {
      navigate(BrowserRoutes.ACCOUNT, {
        replace: true,
      });
    } else {
      navigate(BrowserRoutes.START, {
        replace: true,
      });
    }
  }, [userState.authToken]);

  return (
    <>
      <main>
        <Routes>
          <Route path={BrowserRoutes.START} element={<Start />} />
          <Route path={BrowserRoutes.LOGIN} element={<Login />} />
          <Route path={BrowserRoutes.REGISTER} element={<Register />} />
          <Route path={BrowserRoutes.ACCOUNT} element={<Account />} />
          <Route path={BrowserRoutes.ANY} element={<NavigateOnError />} />
        </Routes>
      </main>
      <BottomNavBar />
    </>
  );
};

export default RoutesManager;
