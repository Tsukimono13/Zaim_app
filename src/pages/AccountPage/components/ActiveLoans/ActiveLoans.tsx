import { Button } from "@/components/Button";
import styles from "./ActiveLoans.module.scss";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import {
  LoanStatus,
  useLoans,
} from "@/app/context/LoansProvider/LoansProvider";
import { formatNumber } from "@/lib/formatNumber/formatNumber";

interface ActiveLoansProps {
  setShowCallback: (showCallback: boolean) => void;
}

export const ActiveLoans = (props: ActiveLoansProps) => {
  const { setShowCallback } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { loans } = useLoans();

  const handleReturnClick = () => {
    setIsOpenModal(false);
    setShowCallback(true);
  };

  return (
    <div className={styles.activeLoans}>
      <h3 className={styles.activeLoansTitle}>Активные займы</h3>
      {loans.map((loan) => (
        <>
          <div className={styles.loanContainer} key={loan.id}>
            <p>Сумма займа</p>
            <span>{formatNumber(loan.sum) + " ₽"}</span>
            <p>Сумма возврата</p>
            <span>{formatNumber(loan.return_sum) + " ₽"}</span>
            <p>Дата подачи</p>
            <span>{loan.application_date}</span>
            <p>Дата возврата</p>
            <span>{loan.return_date}</span>
            <p>Статус</p>
            <span
              className={
                loan.status === LoanStatus.Active
                  ? styles.active
                  : styles.inProcess
              }
            >
              {loan.status}
            </span>
          </div>
          <div className={styles.line} />
        </>
      ))}
      <div className={styles.btnContainer}>
        <Button onClick={() => setIsOpenModal(true)}>Погасить заём</Button>
      </div>
      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        className={styles.modal}
      >
        <p>
          Погашение займа за пределами Российской Федерации, Республики Беларусь
          или Казахстана временно недоступно. Пожалуйста, оставьте заявку на
          обратный звонок
        </p>
        <Button onClick={handleReturnClick}>Ок</Button>
      </Modal>
    </div>
  );
};
