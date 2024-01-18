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
import TestDetail from "./features/TestManagement/pages/TestDetail";
import UserDetail from "./features/UserManagement/pages/UserDetail";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const loading = useAppSelector(selectLoading);

  return (
    <React.Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path={"/"} element={<MainLayout />}>
          <Route index element={<UserManagement />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="tests" element={<TestManagement />} />
          <Route path="tests/:id" element={<TestDetail />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
      {loading > 0 && <Loading />}
    </React.Fragment>
  );
};

export default App;
