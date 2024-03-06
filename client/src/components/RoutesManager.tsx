import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigateOnError from "./NavigateOnError";
import Start from "../pages/Start";
import BottomNavBar from "./BottomNavBar";
import Login from "./start/Login";
import Register from "./start/Register";
import { BrowserRoutes } from "../data/enums";

const RoutesManager = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path={BrowserRoutes.START} element={<Start />} />
          <Route path={BrowserRoutes.LOGIN} element={<Login />} />
          <Route path={BrowserRoutes.REGISTER} element={<Register />} />
          <Route path={BrowserRoutes.ANY} element={<NavigateOnError />} />
        </Routes>
      </main>
      <BottomNavBar />
    </BrowserRouter>
  );
};

export default RoutesManager;
