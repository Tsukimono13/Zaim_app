import React, { InputHTMLAttributes, memo } from "react";
import styles from "./Input.module.scss";
import { classNames } from "@/lib/classNames/classNames";
import InputMask from "react-input-mask";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  mask?: string;
}

export const Input = memo((props: InputProps) => {
  const {
    onChange,
    value,
    type = "text",
    placeholder,
    className,
    mask,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <>
      {mask ? (
        <InputMask
          mask={mask}
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          className={classNames(styles.input, {}, [className])}
        ></InputMask>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
          className={classNames(styles.input, {}, [className])}
          {...otherProps}
        />
      )}
    </>
  );
});
