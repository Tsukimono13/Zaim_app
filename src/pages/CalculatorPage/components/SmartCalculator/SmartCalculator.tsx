import { useState, useEffect } from "react";
import styles from "./SmartCalculator.module.scss";
import { RangeSlider } from "../RangeSlider";
import { TotalPayment } from "../TotalPayment";
import {
  LoanStatus,
  useLoans,
} from "@/app/context/LoansProvider/LoansProvider";
import { roundNumbers } from "@/lib/roundNumbers/roundNumbers";

interface SmartCalculatorProps {
  setShowAccountPage: (value: boolean) => void;
  setShowSignIn: (value: boolean) => void;
}

export const SmartCalculator = (props: SmartCalculatorProps) => {
  const { setShowAccountPage, setShowSignIn } = props;
  const [sum, setSum] = useState(1000);
  const [percent, setPercent] = useState(0.5);
  const [days, setDays] = useState(61);
  const [monthlyPayment, setMonthlyPayment] = useState(1000);
  const [overPayment, setOverPayment] = useState(1);
  const [totalPayment, setTotalPayment] = useState(1001);
  
  const { addLoan } = useLoans();
  const [newLoan, setNewLoan] = useState({
    sum: 1,
    return_sum: 1001,
    application_date: "",
    return_date: "",
    status: LoanStatus.UnderReview,
  });

  useEffect(() => {
    calculateLoan();
  }, [sum, percent, days]);

  const calculateLoan = () => {
    const dailyRate = percent / 100 / 365;
    const overPayment = sum * dailyRate * days;
    const totalPayment = sum + overPayment;
    const months = days / 30.42;
    const perMonth = totalPayment / months;

    setMonthlyPayment(roundNumbers(perMonth));
    setOverPayment(roundNumbers(overPayment));
    setTotalPayment(roundNumbers(totalPayment));

    setNewLoan({
      sum: sum,
      return_sum: roundNumbers(totalPayment),
      application_date: getCurrentDate(),
      return_date: getReturnDate(),
      status: LoanStatus.UnderReview,
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("ru-RU");
  };

  const getReturnDate = () => {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + days);
    return returnDate.toLocaleDateString("ru-RU");
  };

  const handleAddLoan = () => {
    calculateLoan();
    addLoan(newLoan);
    setShowAccountPage(true);
  };

  return (
    <div className={styles.calculator}>
      <RangeSlider
        min={1000}
        max={80000}
        step={100}
        value={sum}
        onChange={setSum}
        label="Сумма"
        unit="₽"
        labelMin={"1 000"}
        labelMax={"80 000"}
      />
      <RangeSlider
        min={0.5}
        max={32}
        step={0.5}
        value={percent}
        onChange={setPercent}
        label="Ставка"
        unit="%"
        labelMin={"0,5%"}
        labelMax={"32%"}
      />
      <RangeSlider
        min={61}
        max={365}
        step={1}
        value={days}
        onChange={setDays}
        label="Срок"
        unit="дней"
        labelMin={"61 день"}
        labelMax={"365 дней"}
      />

      <TotalPayment
        monthlyPayment={monthlyPayment}
        overPayment={overPayment}
        totalPayment={totalPayment}
        addLoan={handleAddLoan}
        setShowSignIn={setShowSignIn}
      />
    </div>
  );
};
