import React from "react";
import UserLogin from "../users/UserLogin";
import UserRegister from "../users/UserRegister";

const App = () => {
  return (
    <div>
      <h1>Client Shop</h1>
      <UserLogin></UserLogin>
      <UserRegister></UserRegister>
    </div>
  );
};

export default App;
