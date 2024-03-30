"use client";
import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
function ContextWrapper(props) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        isError,
        setIsError,
        user,
        setUser,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
