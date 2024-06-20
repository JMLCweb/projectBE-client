import React from "react";
import UserLogin from "../users/UserLogin";
import UserRegister from "../users/UserRegister";

const centerText = {
  textAlign: "center",
};

const App = () => {
  return (
    <div style={centerText}>
      <h1>Client Shop</h1>
      <UserLogin></UserLogin>
      <UserRegister></UserRegister>
    </div>
  );
};

export default App;
