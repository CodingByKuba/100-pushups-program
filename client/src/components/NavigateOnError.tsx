import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { BrowserRoutes } from "../data/enums";

const NavigateOnError = () => {
  const { userState } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      userState.authToken ? BrowserRoutes.ACCOUNT : BrowserRoutes.START,
      { replace: true }
    );
  }, []);

  return null;
};

export default NavigateOnError;
