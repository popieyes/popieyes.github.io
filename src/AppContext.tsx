import React, { createContext, useContext, useState, useCallback } from "react";

interface AppContextType {
  projectPageVisible : boolean;
  setProjectPageVisibility : (value : boolean) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
}
export const AppProvider: React.FC<{children : React.ReactNode}> = ({ children }) => {
  const [projectPageVisible, setProjectPageVisibility] = useState(false);
  return(
    <AppContext.Provider value={{projectPageVisible, setProjectPageVisibility}}>
      {children}
    </AppContext.Provider>
  );
};