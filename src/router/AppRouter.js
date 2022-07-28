import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth/pages/LoginPage';
import { useAuthStore } from '../hooks/useAuthStore';
import { TaskManagerPage } from '../taskManager/TaskManagerPage';


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
        // eslint-disable-next-line
    }, [])

    if ( status === 'checking' ) {
        return (
            <h3><i className="fas fa-spinner fa-pulse"></i> <span>Loading... </span></h3>
        )
    }

    
    return (
        <Routes>
            {
                ( status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <TaskManagerPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}