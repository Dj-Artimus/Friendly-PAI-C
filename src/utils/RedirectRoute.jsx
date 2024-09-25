import { Outlet, Navigate } from "react-router-dom";
import { AuthStore } from "../Stores/AuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";

const RedirectRoute = () => {
    const { isAuthorized , isVerified , AuthorizationCheck } = AuthStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(null)
    useEffect(() => {
        const check = async () => {
            setIsCheckingAuth(true)
            await AuthorizationCheck();
            setIsCheckingAuth(false);
        }
        check();
    }, [])
    
    if (isCheckingAuth) return <LoadingSpinner />;
    return isAuthorized && isVerified ? <Navigate to={'/'} /> : <Outlet />
}

export default RedirectRoute
