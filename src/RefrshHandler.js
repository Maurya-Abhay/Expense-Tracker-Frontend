import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/home', { replace: true });
            }
        } else {
            if (location.pathname !== '/login' && location.pathname !== '/signup') {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;
