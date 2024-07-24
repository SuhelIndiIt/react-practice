import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppState } from "./thunks/dynemicState/AppProvider";

import loginThunk from "./thunks/loginThunk";

function App() {
  const state = useAppState();
  const { dispatch, removePersistedData } = useAppDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (state.userDetails) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [state]);

  const handleLogin = () => {
    let credentials = {
      email: "login@gamil.com",
      password: "passwrod1",
    };
    dispatch(loginThunk(credentials));
  };

  const handleRegister = () => {
    removePersistedData(["userDetails"]);
  };

  return (
    <div>
      <h1>{isLogin ? "Your are login." : "Please login."}</h1>
      <br />
      {isLogin ? (
        <button onClick={handleRegister}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default App;
