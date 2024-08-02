import { Input } from "@/components/Input";
import styles from "../../AccountPage.module.scss";
import style from "./InterCode.module.scss";
import { Button, ThemeButton } from "@/components/Button";
import { useState } from "react";
import { AccountOffice } from "../AccountOffice";
import { AccountPage } from "../../AccountPage";
import { Header } from "@/components/Header";
import { useAuth } from "@/app/context/AuthProvider/AuthProvider";

interface InterCodeProps {
  phoneNumber?: string;
}

export const InterCode = (props: InterCodeProps) => {
  const { phoneNumber } = props;
  const [showAccountOffice, setShowAccountOffice] = useState(false);
  const [showAccountPage, setShowAccountPage] = useState(false);
  const [getCode, setGetCode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const { isLoggedIn, login, logout } = useAuth();

  const handleLogin = () => {
    if (inputValue === "19875" && phoneNumber) {
      login(phoneNumber, inputValue);
      setShowAccountOffice(true);
    } else {
      setError("Неверный код. Пожалуйста, попробуйте снова.");
    }
  };

  if (showAccountPage) {
    return <AccountPage />;
  }

  return (
    <>
      {getCode ? (
        <AccountPage />
      ) : showAccountOffice ? (
        <AccountOffice />
      ) : (
        <section className={styles.container}>
          <Header setShowMainPage={setShowAccountPage}>Вход</Header>
          <Input
            placeholder="Введите код"
            value={inputValue}
            onChange={setInputValue}
          />
          {error && <p className={style.error}>{error}</p>}
          <div className={style.btnContainer}>
            <Button theme={ThemeButton.LINK} onClick={() => setGetCode(true)}>
              Получить код по СМС \ Ввести код
            </Button>
            <Button className={style.signIn} onClick={handleLogin}>
              Войти
            </Button>
          </div>
        </section>
      )}
    </>
  );
};
