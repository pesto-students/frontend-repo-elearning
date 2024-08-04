"use client"
import React, { createContext, useState } from 'react';

export const AppContext = createContext({});

function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [contextData, updateContextData] = useState({});

    const setContextData = (obj: {}) => {
        if (obj)
            updateContextData(prevState => ({ ...prevState, ...obj }))
    }

    return (
        <AppContext.Provider value={{ contextData, setContextData }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;