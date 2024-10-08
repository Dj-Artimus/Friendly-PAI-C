import { Outlet, Navigate } from "react-router-dom";
import { AuthStore } from "../Stores/AuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const { isAuthorized , isVerified , AuthorizationCheck } = AuthStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    useEffect(() => {
        const check = async () => {
            setIsCheckingAuth(true)
            await AuthorizationCheck();
            setIsCheckingAuth(false);
        }
        check();
    }, [])
    

    if (isCheckingAuth) return <LoadingSpinner />;
    if (!isAuthorized || !isVerified) return <Navigate to={'/Friendly-PAI'} />

    return <Outlet />
}

export default ProtectedRoute
