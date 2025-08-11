import { useEffect, useState, type JSX } from "react";

import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function PrivateRoute({children}: {children: JSX.Element}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            return; 
        }

        if (token) {
            AuthService.validateToken(token)
                .then((isValid) => {
                    if (!isValid){
                        localStorage.removeItem("token");
                    }
                    setIsAuthenticated(isValid);
                });
        }
    }, []);

    if (isAuthenticated === null){
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;

}
