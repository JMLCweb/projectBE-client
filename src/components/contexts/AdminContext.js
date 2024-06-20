// src/contexts/AdminContext.js
import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null); // Aqui você pode inicializar com os dados do administrador se necessário

  const adminLogin = (adminData) => {
    setAdminData(adminData); // Exemplo simples de função de login para admin
  };

  const adminLogout = () => {
    setAdminData(null); // Função de logout para admin
  };

  return (
    <AdminContext.Provider value={{ adminData, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};
