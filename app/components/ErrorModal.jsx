"use client";
import CloseIcon from "@mui/icons-material/Close";
import GlobalContext from "@/Context/GlobalContext";
import { useContext } from "react";
function ErrorModal() {
  const { errorMessage, setIsError, setErrorMessage } =
    useContext(GlobalContext);
  return (
    <div className="h-screen w-full fixed bottom-10 flex justify-center items-end ">
      <div className="bg-red-500 flex gap-2 py-5 px-5">
        <h1>{errorMessage}</h1>
        <button
          onClick={() => {
            setIsError(false);
            setErrorMessage("");
          }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
