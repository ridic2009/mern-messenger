import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../../modules/Login";
import Register from "../../modules/Register";
import Inbox from "../Inbox";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import VerifyAccount from "../../modules/VerifyAccount";

export default function Auth() {
  const { token } = useTypedSelector((state) => state.user);
  return (
    <Routes>
      {token ? (
        <>
          <Route path={"/inbox"} element={<Inbox />}></Route>
          <Route
            path={"/*"}
            element={<Navigate to={"/inbox"} replace />}
          ></Route>
        </>
      ) : (
        <>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/register"} element={<Register />}></Route>
          <Route path={"/register/verify"} element={<VerifyAccount />}></Route>
          <Route
            path={"/*"}
            element={<Navigate to={"/login"} replace />}
          ></Route>
        </>
      )}
    </Routes>
  );
}
