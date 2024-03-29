import { lazy, Suspense } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import SingleCar from "../pages/SingleCar";
import Reservation from "../pages/Reservation";
import Rentals from "../pages/Rentals";
import Users from "../pages/Users";
import AddVehicle from "../pages/AddVehicle";
import NotFound from "../pages/NotFound";
import Spinner from "../components/Spinner";

const Vehicles = lazy(() => import("../pages/Vehicles"));

export const routesConfig = {
  login: {
    path: "/sign-in",
    element: <Login />,
  },
  register: {
    path: "/sign-up",
    element: <Register />,
  },
  home: {
    path: "/",
    element: <Home />,
  },
  about: {
    path: "/about",
    element: <AboutUs />,
  },
  contact: {
    path: "/contact",
    element: <ContactUs />,
  },
  vehicles: {
    path: "/vehicles/page/:pageNumber",
    element: (
      <Suspense fallback={<Spinner />}>
        <Vehicles />
      </Suspense>
    ),
  },
  vehicle: {
    path: "/vehicle/:carId",
    element: <SingleCar />,
  },
  rent: {
    path: "/rent/:carId",
    element: <Reservation />,
  },
  rentals: {
    path: "/rentals/page/:pageNumber",
    element: <Rentals />,
  },
  users: {
    path: "/users/page/:pageNumber",
    element: <Users />,
  },
  addVehicle: {
    path: "/add-vehicle",
    element: <AddVehicle />,
  },
  notFound: {
    path: "*",
    element: <NotFound />,
  },
};
