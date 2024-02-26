import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../data/config";
import { FetchContextType, FetchCallbackArguments } from "../data/types";

type PropsType = {
  children?: React.ReactNode;
};

const defaultValue: FetchContextType = {
  isPending: false,
  fetchCallback: () => {},
};

const FetchContext = createContext(defaultValue);

export const FetchContextProvider = ({ children }: PropsType) => {
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
      signal: controller.signal,
    })
      .then((response) => {
        data.successCallback(response);
      })
      .catch((error) => data.errorCallback(error))
      .finally(() => setIsPending(false));
  };

  return (
    <FetchContext.Provider
      value={{
        isPending,
        fetchCallback,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => useContext(FetchContext);
