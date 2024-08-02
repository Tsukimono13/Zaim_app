import styles from "./MainPage.module.scss";
import { Card } from "@/components/Card";
import CallbackIcon from "@assets/icons/callback.svg";

import { MenuList } from "./components/MenuList";
import Drawer from "@/components/Drawer/Drawer";
import { useState } from "react";
import { CallbackPage } from "../CallbackPage";

interface MainPageProps {
  setActivePage?: (page: string) => void;
}

export const MainPage = (props: MainPageProps) => {
  const { setActivePage } = props;
  const [showCallbackPage, setShowCallbackPage] = useState(false);

  if (!setActivePage) return null;

  if (showCallbackPage) {
    return <CallbackPage />;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>ООО "Кредитный Дом"</h1>
      <MenuList setActivePage={setActivePage} />
      <Card
        max
        className={styles.callback}
        onClick={() => setActivePage("callback")}
      >
        <CallbackIcon />
        <h3 className={styles.text}>Обратный звонок</h3>
      </Card>
      <div style={{ position: "relative" }}>
        <Drawer setShowCallbackPage={setShowCallbackPage} />
      </div>
    </section>
  );
};
