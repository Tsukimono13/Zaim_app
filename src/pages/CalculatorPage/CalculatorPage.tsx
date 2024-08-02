import { Header } from "@/components/Header";
import styles from "./CalculatorPage.module.scss";
import { useState } from "react";
import App from "@/App";
import { SmartCalculator } from "./components/SmartCalculator";
import { AccountOffice } from "../AccountPage/components/AccountOffice";
import { AccountPage } from "../AccountPage";

export const CalculatorPage = () => {
  const [showMainPage, setShowMainPage] = useState(false);
  const [showAccountPage, setShowAccountPage] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  if (showMainPage) {
    return <App />;
  }

  if (showAccountPage) {
    return <AccountOffice />;
  }

  if (showSignIn) {
    return <AccountPage />;
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Header setShowMainPage={setShowMainPage}>Калькулятор</Header>
      </div>
      <SmartCalculator
        setShowAccountPage={setShowAccountPage}
        setShowSignIn={setShowSignIn}
      />
    </section>
  );
};
