// src/contexts/UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Aqui você pode inicializar com os dados do usuário se necessário

  const login = (userData) => {
    setUserData(userData); // Exemplo simples de função de login
  };

  const logout = () => {
    setUserData(null); // Função de logout simples
  };

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
