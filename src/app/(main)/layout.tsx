"use client";

import "./layout.css";
import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, Sidebar, useSidebar } from "@/components/sidebar";
import { History, Home, TrendingUp } from "lucide-react";
import { Header } from "@/components/header";
import { Drawer, DrawerProvider } from "@/components/drawer";
import { ProtectedRoute } from "@/components/protected-route";

const HOME_SIDEBAR_ITEMS = [
  {
    key: "home",
    icon: <Home />,
    label: "Home",
  },
  {
    key: "trending",
    icon: <TrendingUp />,
    label: "Trending",
  },
  {
    key: "history",
    icon: <History />,
    label: "History",
  },
];

export default function MainLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/watch/");

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <DrawerProvider>
          <div className="main">
            {!hideLayout && <Sidebar items={HOME_SIDEBAR_ITEMS} />}
            <Header />
            <Drawer items={HOME_SIDEBAR_ITEMS} />
            <PageContainer>{children}</PageContainer>
          </div>
        </DrawerProvider>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

function PageContainer({ children }: PropsWithChildren) {
  const { open: sidebarOpen } = useSidebar();

  return (
    <div
      className="outlet"
      data-sidebar-state={sidebarOpen ? "expanded" : "collapsed"}>
      {children}
    </div>
  );
}
