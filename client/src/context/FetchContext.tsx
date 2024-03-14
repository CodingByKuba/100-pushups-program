import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../data/config";
import { FetchContextType, FetchCallbackArguments } from "../data/types";
import { Backdrop, CircularProgress } from "@mui/material";
import { useUserContext } from "./UserContext";

type PropsType = {
  children?: React.ReactNode;
};

const defaultValue: FetchContextType = {
  isPending: false,
  fetchCallback: () => {},
};

const FetchContext = createContext(defaultValue);

export const FetchContextProvider = ({ children }: PropsType) => {
  const { userState } = useUserContext();
  const [isPending, setIsPending] = useState(false);
  const controller = new AbortController();

  useEffect(() => () => controller.abort(), []);

  const fetchCallback = (data: FetchCallbackArguments) => {
    if (isPending) return;
    setIsPending(true);
    axios({
      url: config.BASE_URL + (data.url || ""),
      method: data.method || "POST",
      timeout: data.timeout || config.FETCH_TIMEOUT,
      data: data.payload || {},
      headers: userState.authToken
        ? {
            Authorization: "Bearer " + userState.authToken,
          }
        : undefined,
      signal: controller.signal,
    })
      .then((response) => {
        data.successCallback(response);
      })
      .catch((error) => data.errorCallback(error))
      .finally(() => {
        if (data.finallyCallback) {
          data.finallyCallback();
        }
        setIsPending(false);
      });
  };

  return (
    <FetchContext.Provider
      value={{
        isPending,
        fetchCallback,
      }}
    >
      {children}
      <Backdrop sx={{ zIndex: 9999 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => useContext(FetchContext);
