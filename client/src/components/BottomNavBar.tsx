import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CottageIcon from "@mui/icons-material/Cottage";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const paths = [
    { path: "/", name: "Start", icon: <CottageIcon /> },
    { path: "/login", name: "Login", icon: <LoginIcon /> },
    { path: "/register", name: "Register", icon: <HowToRegIcon /> },
  ];

  return (
    <nav id="bottom-navigation">
      <BottomNavigation
        id="bottom-navigation-bar"
        showLabels
        value={paths.findIndex((el) => el.path === location.pathname)}
        onChange={(e, newValue) => {
          e.preventDefault();
          navigate(paths[newValue].path);
        }}
      >
        {paths.map((el, index) => (
          <BottomNavigationAction key={index} label={el.name} icon={el.icon} />
        ))}
      </BottomNavigation>
    </nav>
  );
};

export default BottomNavBar;
