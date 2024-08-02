import { Button, ThemeButton } from "@/components/Button";
import styles from "./AccountOffice.module.scss";
import AvatarIcon from "@/assets/icons/avatar.svg";
import { useState } from "react";
import { CallbackPage } from "@/pages/CallbackPage/CallbackPage";
import App from "@/App";
import { ActiveLoans } from "../ActiveLoans";
import { InterCode } from "../InterCode";
import { TermsOfIssue } from "../TermsOfIssue";
import { useAuth } from "@/app/context/AuthProvider/AuthProvider";

export const AccountOffice = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCodeInter, setShowCodeInter] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showCallback, setShowCallback] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  if (showCodeInter) {
    return <App />;
  }

  if (showSignIn) {
    return <App />;
  }

  if (showCallback) {
    return <CallbackPage />;
  }

  const handleLogOut = () => {
    logout();
    setShowSignIn(true);
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AvatarIcon />
          <h2 className={styles.title}>Личный кабинет</h2>
          <Button
            theme={ThemeButton.GO_BACK}
            onClick={() => setShowCodeInter(true)}
          ></Button>
        </div>
        <div className={styles.data}>
          <h3 className={styles.name}>Афанасов Борис Викторович</h3>
          <Button onClick={handleLogOut}>Выйти</Button>
          <Button theme={ThemeButton.LINK} onClick={() => setIsOpenModal(true)}>
            Персональные условия займов
          </Button>
        </div>
        <TermsOfIssue isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
      <ActiveLoans setShowCallback={setShowCallback} />
    </section>
  );
};
