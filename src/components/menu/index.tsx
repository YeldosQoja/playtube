import "./styles.css";
import { ReactNode } from "react";

export type MenuItem = {
  key: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

type MenuProps = {
  mode?: "expanded" | "collapsed";
  items: MenuItem[];
  value: string | null;
  onChange?: (item: MenuItem) => void;
};

export const Menu = ({
  mode = "expanded",
  items,
  value,
  onChange,
}: MenuProps) => {
  return (
    <nav
      role="menu"
      className={`menu ${mode}`}>
      <ul className="menu__list">
        {items.map((i) => (
          <li
            key={i.key}
            className={`menu__item${value === i.key ? " selected" : ""}`}>
            <a onClick={() => onChange && onChange(i)}>
              {i.icon}
              <span className="menu__item-label">{i.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
