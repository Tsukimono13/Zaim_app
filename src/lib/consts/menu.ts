import PersonIcon from "@/assets/icons/personal-account.svg";
import ApplicationIcon from "@/assets/icons/application.svg";
import ServicesIcon from "@/assets/icons/services.svg";
import CalculatorIcon from "@/assets/icons/calculator.svg";

export interface MenuType {
  icon: string;
  text: string;
  name: string;
}

export const menu: MenuType[] = [
  { icon: PersonIcon, text: "Личный кабинет", name: "account" },
  { icon: ApplicationIcon, text: "Заявка", name: "application" },
  { icon: ServicesIcon, text: "Наши услуги", name: "services" },
  { icon: CalculatorIcon, text: "Умный калькулятор", name: "calculator" },
];
