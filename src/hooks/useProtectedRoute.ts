import { useEffect } from "react";
import { getLocalStorage } from "../utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import { useNavigate } from "react-router-dom";

const useProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY)) navigate("/login");
  }, []);
};

export default useProtectedRoute;
