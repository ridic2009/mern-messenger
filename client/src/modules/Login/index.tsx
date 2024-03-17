import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import AuthLayout from "../../components/AuthLayout";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Notice from "../../components/Notice";

import emailIcon from "../../assets/svg/emailIcon";
import passwordIcon from "../../assets/svg/passwordIcon";
import googleIcon from "../../assets/img/google.svg";
import eyeIcon from "../../assets/img/eye.svg";

import { useAppDispatch } from "../../redux/store";
import { fetchUser } from "../../redux/slices/user";

import styles from "./index.module.scss";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>({});
  const [_, setValue] = useState("");

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const authorize = (token: string) => {
    axios.defaults.headers.common["token"] = token;
    dispatch(fetchUser());
    console.log("Вы успешно авторизованы!");
  };

  const login = async (postData: any) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/user/login",
        postData
      );

      const { token } = data;
      token && authorize(token);
      window.localStorage.setItem('token', token)
    } catch (error: any) {
      error &&
        (() => {
          setIsNoticeVisible(true);
          setError(error.response.data);
        })();

      setTimeout(() => {
        setIsNoticeVisible(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isNoticeVisible && (
        <Notice
          title={error.statusCode}
          text={error.message}
          isVisible={isNoticeVisible}
        />
      )}
      <AuthLayout>
        <div className={styles.login}>
          <header>
            <Logo />
            <p>
              Нету аккаунта? <Link to={"/register"}>Зарегистрируйтесь</Link>
            </p>
          </header>

          <h1>Добро пожаловать!</h1>
          <p>Выполните вход в аккаунт</p>

          <form onSubmit={handleSubmit((data) => login(data))}>
            <Input
              style={errors.email ? styles.inputError : styles.loginInput}
              register={register}
              type="email"
              placeholder="Например, ivan85@gmail.com"
              id="email"
              label="Почта"
              rules={{
                required: {
                  value: true,
                  message: "Поле обязательно для заполнения йоу!",
                },
              }}
              icon={emailIcon()}
            />

            {errors.email && (
              <p className={styles.errorMessage}>
                {String(errors.email.message)}
              </p>
            )}

            <Input
              style={errors.email ? styles.inputError : styles.loginInput}
              register={register}
              type={showPassword ? "text" : "password"}
              placeholder="Например, r2D2!$%32FF3c"
              id="password"
              label="Пароль"
              icon={passwordIcon()}
              rules={{
                required: {
                  value: true,
                  message: "Поле обязательно для заполнения йоу!",
                },
              }}
              handleChange={handleChange}
              showPasswordIcon={
                <img
                  onClick={handlePassword}
                  className={styles.showPassword}
                  src={eyeIcon}
                  alt="Показать пароль"
                />
              }
            />

            {errors.password && (
              <p className={styles.errorMessage}>
                {String(errors.password.message)}
              </p>
            )}

            <p className={styles.forgotPassword}>
              Забыли пароль? <Link to={"/recovery"}>Восстановите</Link>
            </p>

            <Button
              className={styles.loginBtn}
              type="submit"
              disabled={isNoticeVisible || isLoading}
              title="Войти"
            />
          </form>

          <span>или</span>

          <button className={styles.googleAuth}>
            <img src={googleIcon} alt="Google icon" />
            Войти с помощью Google
          </button>
        </div>
      </AuthLayout>
    </>
  );
}
