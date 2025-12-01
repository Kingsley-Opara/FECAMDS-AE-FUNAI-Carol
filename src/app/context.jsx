"use client"
import { useContext, useState, createContext } from "react";

const GlobalStateContext = createContext()

export const GlobalStateProvider = ({children}) =>{
    const [show, setShow] = useState(false)

    const toggleShow = ()=>{
        setShow(!show)
    }

    return(
        <GlobalStateContext.Provider value={{show, setShow, toggleShow}}>
            {children}

        </GlobalStateContext.Provider>
    )

}

export const useGlobalContext = () => useContext(GlobalStateContext)