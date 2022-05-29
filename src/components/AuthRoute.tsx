import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const AuthRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <Spinner />
    }

    return loggedIn ? <Navigate to='/' /> : <Outlet />
}

export default AuthRoute;
