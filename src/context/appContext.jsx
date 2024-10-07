import { useState, useEffect, createContext } from "react";
import { getStorageUser, setStorageUser } from "../utils/storage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const user = getStorageUser();
        setUser(user);
    }, [])

    useEffect(() => {
        if (user !== null) {
            console.log('In appContext, user changed', user);
            setStorageUser(user);
        }
    }, [user]);

    return (
        <AppContext.Provider
            value={{ user, setUser, records, setRecords }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider