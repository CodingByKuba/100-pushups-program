import { createContext, useContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";
import trainingReducer from "../reducers/trainingReducer";
import { trainingInitialState, userInitialState } from "../data/initialState";
import useLocalStorage from "../hooks/useLocalStorage";
import { LocalStorageMemory } from "../data/enums";

type PropsType = {
  children?: React.ReactNode;
};

const defaultValue: any = undefined;

const UserContext = createContext(defaultValue);

export const UserContextProvider = ({ children }: PropsType) => {
  const [memoryAuthToken, setMemoryAuthToken] = useLocalStorage(
    LocalStorageMemory.AUTH_TOKEN,
    ""
  );
  const [memoryEmail, setMemoryEmail] = useLocalStorage(
    LocalStorageMemory.EMAIL,
    ""
  );
  const [memoryPassword, setMemoryPassword] = useLocalStorage(
    LocalStorageMemory.PASSWORD,
    ""
  );
  const [memoryPasswordRemember, setMemoryPasswordRemember] = useLocalStorage(
    LocalStorageMemory.PASSWORD_REMEMBER,
    false
  );
  const [memoryAutoLogin, setMemoryAutoLogin] = useLocalStorage(
    LocalStorageMemory.AUTO_LOGIN,
    false
  );

  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [trainingState, trainingDispatch] = useReducer(
    trainingReducer,
    trainingInitialState
  );

  return (
    <UserContext.Provider
      value={{
        memoryAuthToken,
        memoryEmail,
        memoryPassword,
        memoryPasswordRemember,
        memoryAutoLogin,
        setMemoryAuthToken,
        setMemoryEmail,
        setMemoryPassword,
        setMemoryPasswordRemember,
        setMemoryAutoLogin,
        userState,
        userDispatch,
        trainingState,
        trainingDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
