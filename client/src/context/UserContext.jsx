import {createContext, useState} from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
    numOrder:0
  });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}