import {createContext, useState, useContext} from 'react';

const AuthContext = createContext(null);


export const AuthProvider = ({children} ) => {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(sessionStorage.getItem('token')))
    const toggleAuth = () => setIsLoggedIn(prev => !prev)

    const value = {
        isLoggedIn: isLoggedIn,
        toggleAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuthContext = () => {
    const values = useContext(AuthContext)
    return values
}