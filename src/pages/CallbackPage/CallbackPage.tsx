import { Header } from "@/components/Header";
import styles from "./CallbackPage.module.scss";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { SuccessScreen } from "../ApplicationPage/components/SuccessScreen";
import App from "@/App";

export const CallbackPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ fio?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { fio?: string; phone?: string } = {};

    if (!fio.trim()) {
      newErrors.fio = "ФИО обязательно для заполнения";
    }

    if (!phone) {
      newErrors.phone = "Номер телефона обязателен для заполнения";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowSuccess(true);
    }
  };

  if (showSuccess) {
    return <SuccessScreen />;
  }

  if (showMainPage) {
    return <App />;
  }

  return (
    <section className={styles.container}>
      <Header setShowMainPage={setShowMainPage}>Обратный звонок</Header>
      <div className={styles.wrapperInput}>
        <div className={styles.fio}>
          <Input placeholder="ФИО" value={fio} onChange={setFio} />
          {errors.fio && <p className={styles.error}>{errors.fio}</p>}
        </div>
        <div className={styles.phone}>
          <Input
            placeholder="Номер телефона"
            mask="+7 (999) 999 99 99"
            type="tel"
            value={phone}
            onChange={setPhone}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <div className={styles.reason}>
          <Input placeholder="Введите причину обращения" />
        </div>
        <Textarea placeholder="Введите сообщение" />
      </div>
      <div className={styles.wrapperButton}>
        <Button onClick={handleSubmit}>Отправить</Button>
      </div>
    </section>
  );
};
