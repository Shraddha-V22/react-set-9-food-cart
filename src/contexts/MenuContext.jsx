import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetch } from "../fakeFetch";

const MenuContext = createContext(null);

export default function MenuProvider({ children }) {
  const [menu, setMenu] = useState([]);

  const getMenuData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/menu");
      setMenu(response.data.menu);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getMenuData();
  }, []);

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
