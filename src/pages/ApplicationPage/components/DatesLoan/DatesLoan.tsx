import { useState } from "react";
import styles from "../../ApplicationPage.module.scss";
import { Button, ThemeButton } from "@/components/Button";
import { ISettingsPointer, RoundSlider } from "mz-react-round-slider";
import { days } from "@/lib/consts/loanDays";
import { ApplicationPage } from "../../ApplicationPage";
import { ApplicationForm } from "../ApplicationForm";
import { Header } from "@/components/Header";
import { TermsOfIssue } from "@/pages/AccountPage/components/TermsOfIssue";

export const DatesLoan = () => {
  const [prevPage, setPrevPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showApplicationForm, setIsApplicationForm] = useState(false);
  const [pointers, setPointers] = useState<ISettingsPointer[]>([
    { value: 61, radius: 12, bgColor: "#5BD000", bgColorSelected: "#5BD000" },
  ]);

  if (prevPage) {
    return <ApplicationPage />;
  }

  if (showApplicationForm) {
    return <ApplicationForm />;
  }

  return (
    <section className={styles.container}>
      <Header setShowMainPage={setPrevPage}>Заявка</Header>
      <p className={styles.title}>Выберите срок займа</p>
      <p className={styles.sum}>Срок займа</p>
      <div className={styles.sliderContainer}>
        <RoundSlider
          pointers={pointers}
          onChange={setPointers}
          textColor={"#364041"}
          textFontSize={31}
          textFontFamily={"Gotham Pro,sans-serif"}
          data={days}
          pointerBgColor={"#5BD000"}
          pathStartAngle={160}
          pathEndAngle={20}
          pathThickness={11}
          pathBgColor={"white"}
          textOffsetX={0}
          textOffsetY={-22}
          connectionBgColor={"#5BD000"}
          rangeDragging={false}
        />
      </div>
      <div className={styles.btnsContainer}>
        <Button onClick={() => setIsApplicationForm(true)}>Далее</Button>
        <Button theme={ThemeButton.LINK} onClick={() => setIsModalOpen(true)}>
          Условия выдачи займов
        </Button>
      </div>
      <TermsOfIssue isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  );
};
