import { useIsMobile } from "@/hooks/useIsMobile";
import { Menu, MenuItem } from "../menu";
import "./styles.css";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type SidebarContextProps = {
  open: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

const useSidebar = () => {
  const value = useContext(SidebarContext);
  if (!value) {
    throw new Error("useSidebar must be used with a SidebarProvider!");
  }
  return value;
};

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggleSidebar,
      }}>
      {children}
    </SidebarContext.Provider>
  );
};

type SidebarProps = {
  items: MenuItem[];
};

const Sidebar = ({ items }: SidebarProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  const handleClick = (item: MenuItem) => {
    setSelectedValue(item.key);
    if (item.onClick) item.onClick();
  };

  return (
    <aside className={`sidebar ${open ? "" : "collapsed"}`}>
      <Menu
        mode={isMobile ? "collapsed" : open ? "expanded" : "collapsed"}
        items={items}
        value={selectedValue}
        onChange={handleClick}
      />
    </aside>
  );
};

export { SidebarProvider, useSidebar, Sidebar };
