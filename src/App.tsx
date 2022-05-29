import { routesConfig } from "./routes/routesConfig";

import AuthRoute from "./components/AuthRoute";
import PrivateRoute from "./components/PrivateRoute";

import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6701'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1500,
      xl: 1525,
    },
  },
});

function clearStorage() {
  let cookie = document.cookie;

  if (cookie === '') {
    localStorage.removeItem('user');
  }
  document.cookie = 'l=1';
}

const App = () => {
  window.addEventListener('load', clearStorage);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path={routesConfig.login.path} element={<AuthRoute />}>
            <Route path={routesConfig.login.path} element={routesConfig.login.element} />
          </Route>
          <Route path={routesConfig.register.path} element={<AuthRoute />}>
            <Route path={routesConfig.register.path} element={routesConfig.register.element} />
          </Route>
          <Route path={routesConfig.home.path} element={routesConfig.home.element} />
          <Route path={routesConfig.about.path} element={routesConfig.about.element} />
          <Route path={routesConfig.contact.path} element={routesConfig.contact.element} />
          <Route path={routesConfig.vehicles.path} element={routesConfig.vehicles.element} />
          <Route path={routesConfig.vehicle.path} element={routesConfig.vehicle.element} />
          <Route path={routesConfig.rent.path} element={<PrivateRoute />}>
            <Route path={routesConfig.rent.path} element={routesConfig.rent.element} />
          </Route>
          <Route path={routesConfig.rentals.path} element={<PrivateRoute />}>
            <Route path={routesConfig.rentals.path} element={routesConfig.rentals.element} />
          </Route>
          <Route path={routesConfig.users.path} element={<PrivateRoute />}>
            <Route path={routesConfig.users.path} element={routesConfig.users.element} />
          </Route>
          <Route path={routesConfig.addVehicle.path} element={<PrivateRoute />}>
            <Route path={routesConfig.addVehicle.path} element={routesConfig.addVehicle.element} />
          </Route>
          <Route path={routesConfig.notFound.path} element={routesConfig.notFound.element} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
