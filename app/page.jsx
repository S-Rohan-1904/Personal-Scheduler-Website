"use client";

import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import GlobalContext from "../Context/GlobalContext";
import Cookies from "js-cookie";
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
  useEffect(() => {
    setIsError(false);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sutt-front-task2-d09a14a7c50b.herokuapp.com/auth/login",
        {
          email: email,
          password: password,
        }
      );
      setIsLoggedin(true);
      setIsError(false);
      setErrorMessage("");
      Cookies.set("token", response.data.token, {
        expires: 1 / 24, // Expires in 1 hour
        // httpOnly: true, // HTTP-only cookie
        // secure: true, // Secure cookie (HTTPS only)
        // sameSite: "strict", // SameSite cookie attribute
      });

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-10 py-10 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Login</h3>
          <form>
            {isError && <h1 className="text-red-500 my-5">{errorMessage}</h1>}
            <div className="mt-4">
              <div>
                <label className="block" for="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-600"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md  focus:ring-blue-600"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                onClick={handleSubmit}
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
