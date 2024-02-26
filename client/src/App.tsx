import { FetchContextProvider } from "./context/FetchContext";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <FetchContextProvider>
        <>Hello World</>
      </FetchContextProvider>
    </UserContextProvider>
  );
};

export default App;
