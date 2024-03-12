import RoutesManager from "./components/RoutesManager";
import { FetchContextProvider } from "./context/FetchContext";
import { UserContextProvider } from "./context/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

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
          <BrowserRouter>
            <RoutesManager />
          </BrowserRouter>
        </ThemeProvider>
      </FetchContextProvider>
    </UserContextProvider>
  );
};

export default App;
