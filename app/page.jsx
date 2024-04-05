"use client";

import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import GlobalContext from "../Context/GlobalContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setIsLoggedin,
    isError,
    setIsError,
    setUser,
    errorMessage,
    setErrorMessage,
  } = useContext(GlobalContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sutt-front-task2-d09a14a7c50b.herokuapp.com/auth/login",
        {
          // email: email,
          // password: password,
          email: "f20230935@pilani.bits-pilani.ac.in",
          password: "Roha0935",
        }
      );
      setIsLoggedin(true);
      setIsError(false);
      localStorage.setItem("token", response.data.token);
      router.push("/calendars");
    } catch (err) {
      setIsLoggedin(false);
      setIsError(true);
      if (!err?.response) {
        console.log(err);
        setErrorMessage("No Server Response");
      } else if (err.response?.status == 400) {
        setErrorMessage("Invalid Authentication");
      } else if (err.response?.status == 401) {
        setErrorMessage("Unable to reach the server");
      } else {
        setErrorMessage("Login Failed");
      }
    }
  };

  return (
    <main>
      {isError && <h1>{errorMessage}</h1>}
      <input
        type="text"
        name=""
        id=""
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </main>
  );
}
