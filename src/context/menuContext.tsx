import { createContext, ReactNode, useContext, useState } from "react";

type MenuContextProps = {
    isOpen: boolean,
    toggleMenu: any,
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider = ({children}: {children: ReactNode}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    } // dynamic open & closing on mobile

    return(
        <MenuContext.Provider value={{isOpen, toggleMenu}}>
            {children}
        </MenuContext.Provider>
    )

}

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};

