import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { NotFoundPage } from "./components/commons";
import { Loading } from "./components/commons/Loading";
import MainLayout from "./components/layouts/MainLayout";
import UserManagement from "./features/UserManagement/pages/UserManagement";
import Login from "./features/login/pages";
import { selectLoading } from "./redux/globalSlice";
import TestManagement from "./features/TestManagement/pages/TestManagement";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const loading = useAppSelector(selectLoading);

  return (
    <React.Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path={"/"} element={<MainLayout />}>
          <Route index element={<UserManagement />} />
          <Route path="tests" element={<TestManagement />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
      {loading > 0 && <Loading />}
    </React.Fragment>
  );
};

export default App;
