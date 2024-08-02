import { MenuListItem } from "../MenuListItem/MenuListItem";
import styles from "./MenuList.module.scss";
import { menu } from "@/lib/consts/menu";

interface MenuListProps {
  setActivePage: (page: string) => void;
}

export const MenuList = (props: MenuListProps) => {
  const {setActivePage} = props;
  return (
    <div className={styles.menu}>
      {menu.map((menuItem) => (
        <MenuListItem item={menuItem} setActivePage={setActivePage} />
      ))}
    </div>
  );
};
