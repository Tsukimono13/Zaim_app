import { Header } from "@/components/Header/Header";
import styles from "./ApplicationForm.module.scss";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button, ThemeButton } from "@/components/Button";
import { TermsOfIssue } from "@/pages/AccountPage/components/TermsOfIssue";
import { DatesLoan } from "../DatesLoan";
import { SuccessScreen } from "../SuccessScreen";
import { LoanStatus, useLoans } from "@/app/context/LoansProvider/LoansProvider";
import { roundNumbers } from "@/lib/roundNumbers/roundNumbers";
import { getCurrentDate } from "@/lib/getCurrentDate/getCurrentDate";

interface ApplicationFormProps {
  sum: number;
  days: number;
}

export const ApplicationForm = (props: ApplicationFormProps) => {
  const { sum, days } = props;
  const [prevPage, setPrevPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [fio, setFio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ fio?: string; email?: string }>({});

  const { addLoan } = useLoans();
  const [totalPayment, setTotalPayment] = useState(1001);

  const validate = () => {
    const newErrors: { fio?: string; email?: string } = {};

    if (!fio.trim()) {
      newErrors.fio = "ФИО обязательно для заполнения";
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      newErrors.email = "Введите корректный e-mail";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
console.log(days)
  const calculateLoan = () => {
    const dailyRate = 0.5 / 100 / 365;
    const overPayment = sum * dailyRate * days;
    const totalPayment = sum + overPayment;

    setTotalPayment(roundNumbers(totalPayment));
  };

  const handleSubmit = () => {
    if (validate()) {
      const newLoan = {
        sum,
        return_sum: roundNumbers(totalPayment),
        application_date: getCurrentDate(),
        return_date: getReturnDate(),
        status: LoanStatus.UnderReview,
      };
      calculateLoan();
      addLoan(newLoan);
      setShowSuccess(true);
    }
  };

  const getReturnDate = () => {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + days);
    return returnDate.toLocaleDateString("ru-RU");
  };

  if (prevPage) {
    return <DatesLoan />;
  }

  if (showSuccess) {
    return <SuccessScreen />;
  }

  return (
    <section className={styles.container}>
      <Header setShowMainPage={setPrevPage}>Заявка</Header>
      <div className={styles.infoWrapper}>
        <h3>Контактные данные</h3>
        <div className={styles.fio}>
          <Input placeholder="ФИО" value={fio} onChange={setFio} />
          {errors.fio && <p className={styles.error}>{errors.fio}</p>}
        </div>
        <div className={styles.email}>
          <Input placeholder="e-mail" value={email} onChange={setEmail} />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.phone}>
          <Input
            value={phone}
            onChange={setPhone}
            placeholder="Номер телефона"
            mask="+7 (999) 999 99 99"
            type="tel"
          />
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <Button onClick={handleSubmit}>Далее</Button>
        <Button theme={ThemeButton.LINK} onClick={() => setIsModalOpen(true)}>
          Условия выдачи займов
        </Button>
      </div>
      <TermsOfIssue isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  );
};
