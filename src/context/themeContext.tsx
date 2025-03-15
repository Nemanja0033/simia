import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeContext = {
    theme: string,
    toggleTheme: () => void,
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider =  ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        if(theme == 'light'){
            setTheme('dark')
        }
        else{
            setTheme('light');
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme: any = localStorage.getItem('theme');
        document.querySelector('html')?.setAttribute("data-theme", localTheme);
    })

    return(
        <ThemeContext.Provider value={{toggleTheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
