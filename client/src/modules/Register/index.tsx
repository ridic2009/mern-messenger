import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import AuthLayout from "../../components/AuthLayout";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Notice from "../../components/Notice";

import emailIcon from "../../assets/svg/emailIcon";
import passwordIcon from "../../assets/svg/passwordIcon";
import loginIcon from "../../assets/svg/loginIcon";
import eyeIcon from "../../assets/img/eye.svg";

import styles from "./index.module.scss";
import user from "../../api/user";

export default function Register() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState("");
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const [error, setError] = useState<any>({});
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

  const registration = async (postData: any) => {
    try {
      const { data } = await user.register(postData);
      return data;
    } catch (error: any) {
      setError(error.response.data.message)
      alert(error.response.data.message)
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
          <p className={styles.strongPassword}>
            Сложный пароль должен включать в себя:
          </p>
          <ul className={styles.rules}>
            <li>Не менее 4 символов</li>
            <li>Одна прописная и заглавная буква</li>
            <li>Один спецсимвол (#$%^@!&*)</li>
            <li>Одна цифра</li>
          </ul>
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
          <form onSubmit={handleSubmit((data) => registration(data))}>
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
