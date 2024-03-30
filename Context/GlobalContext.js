"use client";
import React from "react";

const GlobalContext = React.createContext({
  isLoggedin: false,
  setIsLoggedin: () => {},
  isError: false,
  setIsError: () => {},
  user: {},
  setUser: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
});

export default GlobalContext;
