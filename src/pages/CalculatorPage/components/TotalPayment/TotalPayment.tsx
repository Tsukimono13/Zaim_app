import { useState } from "react";
import styles from "./TotalPayment.module.scss";
import { formatNumber } from "@/lib/formatNumber/formatNumber";
import { Button, ThemeButton } from "@/components/Button";
import { TermsOfIssue } from "@/pages/AccountPage/components/TermsOfIssue";
import { useAuth } from "@/app/context/AuthProvider/AuthProvider";
import { Modal } from "@/components/Modal";

interface TotalPaymentProps {
  monthlyPayment: number;
  overPayment: number;
  totalPayment: number;
  addLoan: () => void;
  setShowSignIn: (value: boolean) => void;
}

export const TotalPayment = (props: TotalPaymentProps) => {
  const { monthlyPayment, overPayment, totalPayment, addLoan, setShowSignIn } =
    props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModel, setErrorModel] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  const handleAddLoans = () => {
    if (isLoggedIn) {
      addLoan();
    } else {
      setErrorModel(true);
    }
  };

  if (errorModel) {
    return (
      <>
        <Modal
          setIsOpen={setErrorModel}
          isOpen={errorModel}
          className={styles.modal}
        >
          <p>Пожалуйста, войдите в аккаунт</p>
          <Button onClick={() => setShowSignIn(true)}>Ок</Button>
        </Modal>
      </>
    );
  }

  return (
    <div className={styles.result}>
      <div className={styles.resultItem}>
        <p>Ежемесячный платёж</p>
        <span>{formatNumber(monthlyPayment)} ₽</span>
      </div>
      <div className={styles.resultItem}>
        <p>Переплата</p> <span>{formatNumber(overPayment)} ₽</span>
      </div>
      <div className={styles.resultItem}>
        <p>Общая выплата</p>
        <span>{formatNumber(totalPayment)} ₽</span>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleAddLoans}>Подать заявку</Button>
        <Button theme={ThemeButton.LINK} onClick={() => setIsModalOpen(true)}>
          Условия выдачи займов
        </Button>
      </div>
      <TermsOfIssue isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};
