import { classNames } from "@/lib/classNames/classNames";
import { Button, ThemeButton } from "../Button";
import styled from "./Header.module.scss";

interface HeaderProps {
  children: React.ReactNode;
  setShowMainPage: (showMainPage: boolean) => void;
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { children, setShowMainPage, className } = props;
  return (
    <header className={classNames(styled.header, {}, [className])}>
      <h2>{children}</h2>
      <Button
        theme={ThemeButton.GO_BACK}
        onClick={() => setShowMainPage(true)}
      ></Button>
    </header>
  );
};
