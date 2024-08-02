import { TextareaHTMLAttributes } from "react";
import styles from './Textarea.module.scss';

type HTMLTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange'
>;

interface TextAreaProps extends HTMLTextareaProps {
  value?: string | number;
  onChange?: (value: string) => void;
}

export const Textarea = (props: TextAreaProps) => {
  const {
    onChange,
    value,
    placeholder,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
      {...otherProps}
    />
  )
}
