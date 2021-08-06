import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async ({ email: identifier, password }) => {
        console.log({
            identifier,
            password
        });
    }

    const logout = async () => {
        console.log('logout');
    }

    const register = async user => {
        console.log(user);
    }

    const checkUserLoggedInState = async user => {
        console.log('check');
    }


    const context = {
        user,
        error,
        login,
        logout,
        register
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;