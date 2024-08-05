import { useState } from "react";
import styles from "../../ApplicationPage.module.scss";
import { Button, ThemeButton } from "@/components/Button";
import { ISettingsPointer, RoundSlider } from "mz-react-round-slider";
import { ApplicationPage } from "../../ApplicationPage";
import { ApplicationForm } from "../ApplicationForm";
import { Header } from "@/components/Header";
import { TermsOfIssue } from "@/pages/AccountPage/components/TermsOfIssue";
import { getDaySuffix } from "@/lib/getDaySuffix/getDaySuffix";

interface IDatesLoanProps {
  sum?: number;
}

export const DatesLoan = (props: IDatesLoanProps) => {
  const { sum = 1000 } = props;
  const [prevPage, setPrevPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showApplicationForm, setIsApplicationForm] = useState(false);
  const [pointers, setPointers] = useState<ISettingsPointer[]>([
    { value: 61, radius: 12, bgColor: "#5BD000", bgColorSelected: "#5BD000" },
  ]);

  const currentDays = Number(pointers[0].value) || 61;
  const daySuffix = getDaySuffix(currentDays);

  if (prevPage) {
    return <ApplicationPage />;
  }

  if (showApplicationForm) {
    return <ApplicationForm sum={sum} days={currentDays} />;
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
          pointerBgColor={"#5BD000"}
          pathStartAngle={160}
          pathEndAngle={20}
          pathThickness={11}
          pathBgColor={"white"}
          textSuffix={daySuffix}
          textOffsetX={0}
          textOffsetY={-22}
          connectionBgColor={"#5BD000"}
          rangeDragging={false}
          min={61}
          max={365}
          step={1}
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
