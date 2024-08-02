import { MenuType } from "@/lib/consts/menu";
import styles from "./MenuListItem.module.scss";
import { Card } from "@/components/Card";

interface MenuListItemProps {
  item: MenuType;
  setActivePage: (page: string) => void;
}

export const MenuListItem = (props: MenuListItemProps) => {
  const { item, setActivePage } = props;
  return (
    <Card className={styles.card} onClick={() => setActivePage(item.name)}>
      {item.icon && <item.icon />}
      <h3 className={styles.text}>{item.text}</h3>
    </Card>
  );
};
