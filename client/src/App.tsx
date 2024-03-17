import { Navigate, Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import { useTypedSelector } from "./hooks/useTypedSelector";

import "./scss/app.scss";

export default function App() {
  const { isAuth } = useTypedSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/*" element={<Auth />}></Route>
      {isAuth ? (
        <Route path="/" element={<Navigate to={"/inbox"}/>}></Route>
      ) : (
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
      )}
    </Routes>
  );
}
