import { Input } from "@/components/Input";
import styles from "./AccountPage.module.scss";
import { Button } from "../../components/Button";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { InterCode } from "./components/InterCode";
import { Header } from "@/components/Header";
import App from "@/App";
import { useAuth } from "@/app/context/AuthProvider/AuthProvider";
import { AccountOffice } from "./components/AccountOffice";

export const AccountPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showInterCode, setShowInterCode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const { isLoggedIn, login, logout } = useAuth();

  const handleOkClick = () => {
    setIsOpen(false);
    setShowInterCode(true);
  };

  const handlePhoneNumber = () => {
    if (inputValue === "+7 (917) 404 12 34") {
      setIsOpen(true);
    } else {
      setError("Неверный номер. Пожалуйста, попробуйте снова.");
    }
  };

  if (showPrevious) {
    return <App />;
  }

  if (isLoggedIn) {
    return <AccountOffice />
  }

  return (
    <>
      {showInterCode ? (
        <InterCode phoneNumber={inputValue} />
      ) : (
        <section className={styles.container}>
          <Header setShowMainPage={setShowPrevious}>Вход</Header>
          <Input
            placeholder="Введите номер телефона"
            value={inputValue}
            onChange={setInputValue}
            mask="+7 (999) 999 99 99"
            type="tel"
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.btnContainer}>
            <Button onClick={handlePhoneNumber}>Получить код по СМС</Button>
            <Button onClick={() => setShowInterCode(true)}>Ввести код</Button>
          </div>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={styles.modal}>
            <h3 className={styles.codeText}>Код отправлен</h3>
            <Button onClick={handleOkClick}>Ок</Button>
          </Modal>
        </section>
      )}
    </>
  );
};
