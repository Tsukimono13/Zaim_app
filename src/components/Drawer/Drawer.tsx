import { useDrag } from "@use-gesture/react";
import { a, useSpring, config } from "@react-spring/web";
import styles from "./Drawer.module.scss";
import OpenIcon from "@/assets/icons/open.svg";
import CloseIcon from "@/assets/icons/close.svg";
import ClockImg from "@/assets/img/clock.png";
import HandsImg from "@/assets/img/meeting.png";
import FamilyImg from "@/assets/img/family.png";
import { useState } from "react";

const items = [
  { text: "Теперь мы на связи 24/7!", img: ClockImg },
  { text: "Приведи друга и получи заем под 0%", img: HandsImg },
  { text: "Пенсионерам все займы под 0,3%", img: FamilyImg },
];

interface DrawerProps {
  setShowCallbackPage: (value: boolean) => void;
}

const height = items.length * 110 + 100;

export default function Drawer({ setShowCallbackPage }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initialY = 260;
  const [{ y }, api] = useSpring(() => ({ y: initialY }));

  const open = ({ canceled }: any) => {
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
    });
    setIsOpen(true);
  };

  const close = (velocity = 0) => {
    api.start({
      y: initialY,
      immediate: false,
      config: { ...config.stiff, velocity },
    });
    setIsOpen(false);
  };

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      offset: [, oy],
      cancel,
      canceled,
    }) => {
      if (oy < -70) cancel();

      if (last) {
        oy > height * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy)
          : open({ canceled });
      } else {
        api.start({ y: oy, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  const display = y.to((py) => (py < height ? "block" : "none"));

  return (
    <div className="flex" style={{ overflow: "hidden" }}>
      <a.div
        className={styles.sheet}
        {...bind()}
        style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
      >
        <a.div>{isOpen ? <CloseIcon /> : <OpenIcon />}</a.div>
        <p>Акции</p>
        {items.map((entry, i) => (
          <div
            key={entry.text}
            onClick={() => setShowCallbackPage(true)}
            children={
              <>
                <p>{entry.text}</p>
                <img
                  src={entry.img}
                  alt={entry.text}
                  width={100}
                  height={100}
                />
              </>
            }
          />
        ))}
      </a.div>
    </div>
  );
}
