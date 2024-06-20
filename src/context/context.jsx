import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [blogPostData, setBlogPostData] = useState([]);

  return (
    <AppContext.Provider
      value={{
        blogPostData,
        setBlogPostData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
