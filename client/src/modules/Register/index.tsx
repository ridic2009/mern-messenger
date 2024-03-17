import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import AuthLayout from "../../components/AuthLayout";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

import emailIcon from "../../assets/svg/emailIcon";
import passwordIcon from "../../assets/svg/passwordIcon";
import loginIcon from "../../assets/svg/loginIcon";
import eyeIcon from "../../assets/img/eye.svg";

import styles from "./index.module.scss";
import axios from "axios";
import Notice from "../../components/Notice";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState("");
  const [formData, setFormData] = useState<any>({});
  const [isNoticeVisible, setIsNoticeVisible] = useState(false)
  const [error, setError] = useState<any>({})
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExiting, setIsModalExiting] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalExiting(false);
    }, 100);
  };

  const registerUser = async (postData: any) => {
    try {
      const { data } = await axios.post<any>(
        "http://localhost:3000/user/register",
        postData
      );

      console.log(data);
    } catch (error: any) {
      error &&
      (() => {
        setIsNoticeVisible(true);
        setError(error.response.data);
      })();

      setTimeout(() => {
        setIsNoticeVisible(false);
      }, 3000);
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
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          isExiting={isModalExiting}
          onClose={closeModal}
        >
          123
        </Modal>
      )}
      <AuthLayout>
        <div className={styles.register}>
          <header>
            <Logo />
            <p>
              Есть аккаунт? <Link to={"/login"}>Войдите</Link>
            </p>
          </header>

          <h1>Добро пожаловать!</h1>
          <p>Зарегистрируйтесь</p>
          <form onSubmit={handleSubmit(registerUser)}>
            <Input
              style={errors.login ? styles.inputError : styles.registerInput}
              handleChange={handleChange}
              type="text"
              placeholder="Например, minecraft_pro"
              id="login"
              label="Логин"
              icon={loginIcon()}
              register={register}
              rules={{
                required: {
                  value: true,
                  message: "Поле обязательно для заполнения йоу!",
                },
              }}
            />

            {errors.login && (
              <p className={styles.errorMessage}>
                {String(errors.login.message)}
              </p>
            )}

            <Input
              style={errors.login ? styles.inputError : styles.registerInput}
              register={register}
              rules={{
                required: {
                  value: true,
                  message: "Поле обязательно для заполнения йоу!",
                },
              }}
              type="email"
              placeholder="Например, ivan85@gmail.com"
              id="email"
              label="Почта"
              icon={emailIcon()}
            />

            {errors.email && (
              <p className={styles.errorMessage}>
                {String(errors.email.message)}
              </p>
            )}

            <Input
              style={errors.login ? styles.inputError : styles.registerInput}
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
                pattern: {
                  value:
                    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
                  message: "Пароль не соответствует требованиям",
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

            <p className={styles.constructPassword}>
              Придумайте{" "}
              <button type="button" onClick={showModal}>
                сложный
              </button>{" "}
              пароль
            </p>

            <Button
              className={styles.registerBtn}
              type="submit"
              title="Зарегистрируйтесь"
              disabled={isNoticeVisible}
            />
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
