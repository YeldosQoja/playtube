"use client";

import "./styles.css";
import { useCallback, useLayoutEffect, useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "@/components";
import Link from "next/link";
import { VideoCardCompact } from "@/components/video-card/compact";
import { PlaylistCard } from "@/components/playlist-card";
import videos from "@/videos.json";
import playlists from "@/playlists.json";

const TAB_ITEMS = [
  {
    value: "videos",
    label: "Videos",
  },
  {
    value: "playlists",
    label: "Playlists",
  },
];

export const Channel = () => {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback(() => {
    console.log("tab changed");
    const tabList = tabListRef.current;
    if (!tabList) return;

    const activeTab = tabList.querySelector(
      '.channel__tab-btn[data-state="active"]'
    );

    const tabUnderline = tabList.querySelector(
      ".tab-underline"
    ) as HTMLDivElement;

    if (!activeTab) return;
    if (!tabUnderline) return;

    const { offsetLeft, offsetWidth } = activeTab as HTMLButtonElement;
    tabUnderline.style.transform = `translateX(${offsetLeft}px)`;
    tabUnderline.style.width = `${offsetWidth}px`;
  }, []);

  useLayoutEffect(() => {
    handleTabChange();
  }, [handleTabChange]);

  return (
    <div className="channel">
      <div className="container flow-content">
        <img
          className="channel__cover"
          src=""
          alt="Channel cover image"
        />
        <div className="channel__header flow-content">
          <div className="header-top">
            <img
              className="channel__avatar"
              src=""
              alt=""
            />
            <div className="header__info flow-content">
              <h1 className="channel__name">Beyond coding</h1>
              <div className="channel__info">
                <strong className="channel__handle">@BeyondCoding</strong>
                <span>•</span>
                <span>54.5K subscribers</span>
                <span>•</span>
                <span>892 videos</span>
              </div>
              <p className="channel__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, id qui ea officia, rem sed quis impedit veritatis
                sunt iure consequuntur, accusamus nulla quod minus at nesciunt!
                Debitis, aspernatur ullam?
              </p>
              <div className="channel__links">
                <a href="">linkedin.com/in/yeldos-kozhabay/</a>
                <span className="more-links-btn">and 3 more links</span>
              </div>
              <Button
                title="Subscribe"
                className="channel__sub-btn"
              />
            </div>
          </div>
          <div className="header-bottom flow-content">
            <div className="channel__links">
              <a href="">linkedin.com/in/yeldos-kozhabay/</a>
              <span className="more-links-btn">and 3 more links</span>
            </div>
            <Button
              title="Subscribe"
              className="channel__sub-btn"
            />
          </div>
        </div>
        <Tabs.Root
          defaultValue="videos"
          onValueChange={handleTabChange}>
          <Tabs.List
            ref={tabListRef}
            className="channel__tabs flow-content--inline">
            {TAB_ITEMS.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                className="channel__tab-btn"
                value={tab.value}>
                {tab.label}
              </Tabs.Trigger>
            ))}
            <div className="tab-underline"></div>
          </Tabs.List>
          <Tabs.Content value="videos">
            <div className="channel__videos">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/watch/${video.id}`}>
                  <VideoCardCompact
                    video={video}
                    displaysChannel={false}
                  />
                </Link>
              ))}
            </div>
          </Tabs.Content>
          <Tabs.Content value="playlists">
            <div className="channel__playlists">
              {playlists.map((playlist) => (
                <Link
                  key={playlist.title}
                  href={`/watch/${playlist.title}`}>
                  <PlaylistCard playlist={playlist} />
                </Link>
              ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};
