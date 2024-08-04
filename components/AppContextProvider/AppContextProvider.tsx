"use client"
import React, { createContext, useCallback, useMemo, useState } from 'react';

type AppContextType = {
    contextData: {
        loginModal?: boolean
    };
    updateContextData: (obj: {}) => void;
}

export const AppContext = createContext<AppContextType>({ contextData: { loginModal: false }, updateContextData: () => { } });

function AppContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [contextData, setContextData] = useState({});

    const updateContextData = useCallback((obj: {}) => {
        if (obj)
            setContextData(prevState => ({ ...prevState, ...obj }))
    }, [])

    const value: AppContextType = useMemo(() => ({ contextData, updateContextData }), [contextData, updateContextData])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;