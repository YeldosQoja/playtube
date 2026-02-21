"use client";

import "./layout.css";
import type { PropsWithChildren } from "react";
import {
  ChartNoAxesCombined,
  Clapperboard,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { Sidebar, SidebarProvider } from "@/components/sidebar";
import { ProtectedRoute } from "@/components/protected-route";

const CREATOR_SIDEBAR_ITEMS = [
  {
    key: "dashboard",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    key: "content",
    icon: <Clapperboard />,
    label: "Content",
  },
  {
    key: "analytics",
    icon: <ChartNoAxesCombined />,
    label: "Analytics",
  },
  {
    key: "community",
    icon: <Users />,
    label: "Community",
  },
];

export default function CreatorLayout({ children }: PropsWithChildren) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="creator">
          <Sidebar items={CREATOR_SIDEBAR_ITEMS} />
          <div className="outlet-container">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
