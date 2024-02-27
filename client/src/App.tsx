import RoutesManager from "./components/RoutesManager";
import { FetchContextProvider } from "./context/FetchContext";
import { UserContextProvider } from "./context/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <UserContextProvider>
      <FetchContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RoutesManager />
        </ThemeProvider>
      </FetchContextProvider>
    </UserContextProvider>
  );
};

export default App;
