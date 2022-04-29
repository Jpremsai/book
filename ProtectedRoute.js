import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/UserAuth";

export function ProtectedRoute({children}) {
    let {user} = UserAuth();
    if(!user) {
        return <Navigate to='/' />;
    }
    return children;
}