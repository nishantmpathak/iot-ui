import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Login from "./components/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/dashboard/Home";
import Electricity from "./components/dashboard/Electricity";
import { ADD_DEVICE, ADD_GATEWEAY, ELECTRICITY_METER, ELECTRICITY_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "./consts/RoutingConstants";
import { ElectricityMeter } from "./components/device/ElectricityMeter";
import AddDevice from "./components/device/AddDevice";
import AddGateway from "./components/gateway/AddGateway";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00e5ff", // cyan IoT style
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light", // This switches the entire UI to light mode
    primary: {
      main: "#1976d2", // Standard Material Blue
    },
    background: {
      default: "#f5f5f5", // Light grey background for the app body
      paper: "#ffffff",   // Pure white for Cards and Papers
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={ELECTRICITY_ROUTE} element={<Electricity />} />
          <Route path={ELECTRICITY_METER+"/:id"} element={<ElectricityMeter />} />
          <Route path={ADD_GATEWEAY} element={<AddGateway/>}/>
          <Route path={ADD_DEVICE} element={<AddDevice/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;