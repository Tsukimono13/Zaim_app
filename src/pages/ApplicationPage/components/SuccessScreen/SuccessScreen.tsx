import { Button } from "@/components/Button";
import styles from "./SuccessScreen.module.scss";
import { useState } from "react";
import App from "@/App";

export const SuccessScreen = () => {
  const [showMainPage, setShowMainPage] = useState(false);

  if (showMainPage) {
    return <App />;
  }

  return (
    <div className={styles.success}>
      <p>Спасибо!</p>
      <p>Ваша заявка принята</p>
      <Button onClick={() => setShowMainPage(true)}>Ок</Button>
    </div>
  );
};
