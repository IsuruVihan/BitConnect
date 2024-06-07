import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTL, setIsTL] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const adminResponse = await fetch(`http://localhost:4000/is-admin`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            });

            const tlResponse = await fetch(`http://localhost:4000/is-tl`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            });

            const adminData = await adminResponse;
            const tlData = await tlResponse;

            if (adminData.status === 403) {
                setIsAdmin(false);
            } else {
                const a = await adminData.json();
                setIsAdmin(a.isAdmin);
            }

            if (tlData.status === 403) {
                setIsTL(false);
            } else {
                const t = await tlData.json();
                setIsTL(t.isTL);
            }
        } catch (error) {
            console.error('An error occurred while fetching admin or TL status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            setLoading(true);
            fetchData();
        }
    }, [token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setIsAdmin(false);
        setIsTL(false);
    };

    return (
      <AuthContext.Provider value={{ token, login, logout, isAdmin, isTL, loading }}>
          {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);