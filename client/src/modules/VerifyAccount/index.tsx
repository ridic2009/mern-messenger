import { Link, useLocation } from "react-router-dom";
import user from "../../api/user";
import { useEffect, useState } from "react";

export default function VerifyAccount() {
  const location = useLocation();
  const hash = location.search.split("hash=")[1];

  const [info, setInfo] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  useEffect(() => {
    const confirmHash = async (hash: string) => {
      if (!hash) {
        setInfo("Пожалуйста, проверьте свою почту для подтверждения аккаунта");
        return;
      }

      try {
        const { data } = await user.verify(hash);

        setInfo(data.message);

        data.message === "Данный аккаунт уже был подтверждён ранее"
          ? setIsAlreadyVerified(true)
          : setIsVerified(true);

        console.log(data);
      } catch ({ response }: any) {
        console.log(
          "Ошибка при подтверждении аккаунта:",
          response.data.message
        );

        setInfo(response.data.message);
        setIsVerified(false);
      }
    };

    confirmHash(hash);
  }, []);

  return isAlreadyVerified ? (
    <div>
      <h1>Аккаунт уже подтверждён</h1>
      <p>{info}</p>
      <Link to={"/login"}>Войти</Link>
    </div>
  ) : isVerified ? (
    <div>
      <h1>Успех</h1>
      <p>{info}</p>
      <Link to={"/login"}>Войти</Link>
    </div>
  ) : (
    <div>
      <h1>Подтверждение аккаунта</h1>
      <p>{info}</p>
    </div>
  );
}
