import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const NavigateOnError = () => {
  const { userState } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(userState.authToken ? "/account" : "/", { replace: true });
  }, []);

  return null;
};

export default NavigateOnError;
