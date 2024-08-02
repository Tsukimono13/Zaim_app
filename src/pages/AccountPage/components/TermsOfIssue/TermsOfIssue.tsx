import { Modal } from "@/components/Modal";
import styles from "./TermsOfIssue.module.scss";
import { Button } from "@/components/Button";
interface TermsOfIssueProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const TermsOfIssue = (props: TermsOfIssueProps) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={styles.modal}>
      <h3>Условия выдачи займов</h3>
      <p>- Минимальный срок погашения кредита составляет 61 день;</p>
      <p>- Максимальный срок погашения кредита составляет 365 дней;</p>
      <p>
        - Максимальная годовая процентная ставка, включающая ссудный процент, а
        также все остальные комиссии и расходы за год (Annual Percentage Rate
        APR) составляет 33%, минимальная 0,5%. Годовой процент за пользование
        Кредитом - min 0,5%, max 32%.{" "}
      </p>
      <p>
        - Минимальная ставка за пользование кредитом в день составляет 0.5%;
      </p>
      <p>
        {" "}
        - Максимальная ставка за пользование кредитом в день составляет 0,84%;
      </p>
      <p> - Минимальная сумма займа 1000 руб.  </p>
      <p> - Максимальная сумма займа 80 000 руб. </p>
      <p> - Другие комиссии отсутствуют. </p>
      <p>
        {" "}
        - Продление кредита возможно при своевременном обращении в офис компании
        персонально или по телефону.
      </p>
      <div className={styles.btnContainer}>
        <Button onClick={() => setIsOpen(false)}>Понятно</Button>
      </div>
    </Modal>
  );
};
