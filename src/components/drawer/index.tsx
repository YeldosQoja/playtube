"use client";

import "./styles.css";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { Menu, MenuItem } from "../menu";

interface DrawerContextProps {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps | null>(null);

const useDrawer = () => {
  const value = useContext(DrawerContext);
  if (!value) {
    throw new Error("useDrawer must be used within DrawerProvider");
  }
  return value;
};

const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        open,
        openDrawer,
        closeDrawer,
      }}>
      {children}
    </DrawerContext.Provider>
  );
};

type Props = {
  items: MenuItem[];
};

const Drawer = ({ items }: Props) => {
  const { open, closeDrawer } = useDrawer();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleMenuChange = (item: MenuItem) => {
    setSelectedValue(item.key);
    item.onClick?.();
    closeDrawer();
  };

  return (
    <>
      <div
        className={`drawer-backdrop${open ? " open" : " closed"}`}
        onClick={closeDrawer}
      />
      <div
        className={`drawer${open ? " open" : " closed"}`}
        role="drawer">
        <Menu
          items={items}
          value={selectedValue}
          onChange={handleMenuChange}
        />
      </div>
    </>
  );
};

export { Drawer, DrawerProvider, useDrawer };
