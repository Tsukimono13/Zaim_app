import { Header } from "@/components/Header/Header";
import styles from "./ApplicationPage.module.scss";
import { useState } from "react";
import { ISettingsPointer, RoundSlider } from "mz-react-round-slider";
import { priceNumbers } from "@/lib/consts/priceNumbers";
import { Button, ThemeButton } from "@/components/Button";
import App from "@/App";
import { TermsOfIssue } from "../AccountPage/components/TermsOfIssue";
import { DatesLoan } from "./components/DatesLoan";


export const ApplicationPage = () => {
  const [showMainPage, setShowMainPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDatesLoan, setShowDatesLoan] = useState(false);

  const [pointers, setPointers] = useState<ISettingsPointer[]>([
    { value: 1000, radius: 12, bgColor: "#5BD000", bgColorSelected: "#5BD000" },
  ]);

  if (showMainPage) {
    return <App />;
  }

  const loanSum = Number(pointers[0].value) || 1000;

  if (showDatesLoan) {
    return <DatesLoan sum={loanSum}/>;
  }

  return (
    <section className={styles.container}>
      <Header setShowMainPage={setShowMainPage}>Заявка</Header>
      <p className={styles.title}>Выберите сумму займа</p>
      <p className={styles.sum}>Сумма займа</p>
      <div className={styles.sliderContainer}>
        <RoundSlider
          pointers={pointers}
          onChange={setPointers}
          textColor={"#364041"}
          textFontSize={31}
          textFontFamily={"Gotham Pro,sans-serif"}
          data={priceNumbers}
          pointerBgColor={"#5BD000"}
          pathStartAngle={160}
          pathEndAngle={20}
          pathThickness={11}
          pathBgColor={"white"}
          textOffsetX={6}
          textOffsetY={-22}
          textSuffix={" ₽ "}
          connectionBgColor={"#5BD000"}
          rangeDragging={false}
        />
      </div>
      <div className={styles.btnsContainer}>
        <Button onClick={() => setShowDatesLoan(true)}>Далее</Button>
        <Button theme={ThemeButton.LINK} onClick={() => setIsModalOpen(true)}>
          Условия выдачи займов
        </Button>
      </div>
      <div className={styles.terms}>
      <TermsOfIssue isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </div>
    </section>
  );
};
