import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigateOnError from "./NavigateOnError";
import Start from "../pages/Start";
import BottomNavBar from "./BottomNavBar";
import Login from "./start/Login";
import Register from "./start/Register";

const RoutesManager = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NavigateOnError />} />
        </Routes>
      </main>
      <BottomNavBar />
    </BrowserRouter>
  );
};

export default RoutesManager;
