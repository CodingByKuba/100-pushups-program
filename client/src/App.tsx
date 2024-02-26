import RoutesManager from "./components/RoutesManager";
import { FetchContextProvider } from "./context/FetchContext";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <FetchContextProvider>
        <RoutesManager />
      </FetchContextProvider>
    </UserContextProvider>
  );
};

export default App;
