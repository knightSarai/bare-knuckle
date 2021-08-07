import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => checkUserLoggedInState(), [])

    const router = useRouter();

    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${NEXT_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message)
            setError(null);
            return;
        }

        setUser(data.user);
        router.push('/account/dashboard');

    }

    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/auth/logout`, {
            method: 'POST'
        });

        const user = await res.json();

        if (res.ok) {
            setUser(null);
            router.push('/')
        }

    }

    const register = async user => {
        const res = await fetch(`${NEXT_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message)
            setError(null);
            return;
        }

        setUser(data.user);
        router.push('/account/dashboard');
    }

    const checkUserLoggedInState = async () => {
        const res = await fetch(`${NEXT_URL}/api/auth/user`);
        const user = await res.json();

        if (res.ok) return setUser(user);

        setUser(null);
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