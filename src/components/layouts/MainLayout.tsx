import React from "react";
import { Header, Sidebar } from "../commons";
import { Outlet } from "react-router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useAppDispatch } from "../../app/hooks";
import { setLoading, updateUserProfile } from "../../redux/globalSlice";
import { useEffectOnce } from "usehooks-ts";
import authApi from "../../api/authApi";
import { useHandleResponseError } from "../../hooks/useHandleResponseError";

interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  useProtectedRoute();
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();

  const fetchData = async () => {
    dispatch(setLoading("ADD"));

    const { ok, body, error } = await authApi.getProfile();
    if (ok && body) {
      dispatch(updateUserProfile(body));
      dispatch(setLoading("REMOVE"));
      return;
    }

    dispatch(setLoading("REMOVE"));
    handleResponseError(error);
  };

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
