"use client";

import "./styles.css";
import {
  ArrowLeft,
  BellIcon,
  MenuIcon,
  SearchIcon,
  UploadIcon,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../input";
import { useSidebar } from "../sidebar";
import { useDrawer } from "../drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCallback, useEffect, useRef, useState } from "react";

export const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { openDrawer } = useDrawer();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToSearchResults = useCallback(() => {
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/results?query=${encodeURIComponent(query)}`);
  }, [router, searchQuery]);

  const handleEnterKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && isSearchInputFocused) {
        navigateToSearchResults();
      }
    },
    [isSearchInputFocused, navigateToSearchResults]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      document.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [handleEnterKeyDown]);

  const handleNotificationClick = useCallback(() => {}, []);

  const handleMenuButtonClick = useCallback(() => {
    const parts = pathname.split("/");
    const route = parts[1];
    if (isMobile || route === "watch") {
      openDrawer();
    } else {
      toggleSidebar();
    }
  }, [isMobile, openDrawer, pathname, toggleSidebar]);

  const handleSearchButtonClick = useCallback(() => {
    setOverlayOpen(true);
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setOverlayOpen(false);
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__menu-btn"
          onClick={handleMenuButtonClick}>
          <MenuIcon />
        </button>
        <Link
          href="/"
          className="header__logo-btn">
          <img
            src=""
            alt="Logo"
            className="header__logo"
          />
        </Link>
      </div>
      <div className="header__center">
        <div className="header__search-bar">
          <Input
            ref={searchInputRef}
            name="search"
            type="search"
            className="header__search-input"
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setIsSearchInputFocused(true)}
            onBlur={() => setIsSearchInputFocused(false)}
          />
          <button
            className="header__search-btn"
            onClick={navigateToSearchResults}>
            <SearchIcon
              size={22}
              strokeWidth={1.75}
            />
          </button>
        </div>
      </div>
      <div className="header__right">
        <button
          className="header__icon-btn header__mobile-btn"
          onClick={handleSearchButtonClick}>
          <SearchIcon
            size={22}
            strokeWidth={1.75}
          />
        </button>
        <Link
          href="/creator/me"
          className="header__upload-btn">
          Upload
          <UploadIcon
            size={20}
            strokeWidth={1.75}
          />
        </Link>
        <button
          className="header__icon-btn"
          onClick={handleNotificationClick}>
          <BellIcon size={24} />
        </button>
        <button className="header__icon-btn">
          <UserCircle
            size={28}
            strokeWidth={1.5}
          />
        </button>
      </div>
      <div
        className="header__overlay"
        data-state={overlayOpen ? "open" : "hidden"}>
        <button
          className="header__icon-btn"
          onClick={handleCloseOverlay}>
          <ArrowLeft size={24} />
        </button>
        <div className="header__search-bar">
          <Input
            name="search"
            type="search"
            className="header__search-input"
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setIsSearchInputFocused(true)}
            onBlur={() => setIsSearchInputFocused(false)}
          />
          <button
            className="header__search-btn"
            onClick={navigateToSearchResults}>
            <SearchIcon
              size={22}
              strokeWidth={1.75}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
