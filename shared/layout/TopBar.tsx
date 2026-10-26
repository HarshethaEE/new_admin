"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Inbox, Search, Settings, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useFindInPage } from "@/shared/lib/useFindInPage";
import { Avatar, Btn, Pill } from "@/shared/ui";
import { LeaderboardButton } from "./LeaderboardButton";
import type { DashboardConfig } from "./types";

const ICON_BTN = "relative size-10 bg-canvas border border-border rounded-[10px] flex items-center justify-center text-ink-2 hover:bg-accent-mist";
const PASSWORD_INPUT = "w-full rounded-[10px] border border-border bg-paper px-3 py-2.5 text-[13px] text-ink font-sans focus:outline-hidden focus:border-accent";

/** Preline-style header: search input, environment badge, actions, viewer. */
export const TopBar = ({ config }: { config: DashboardConfig }) => {
  const { viewer } = config;
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const find = useFindInPage(() => document.querySelector("main"), query);

  // A new page starts with an empty search.
  useEffect(() => setQuery(""), [pathname]);
  useEffect(() => {
    if (!showPasswordForm) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePasswordForm();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showPasswordForm]);

  const closePasswordForm = () => {
    setShowPasswordForm(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("");
  };

  const submitPasswordForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage("The new password and confirmation do not match.");
      return;
    }
    setPasswordMessage("Password updates are not connected to an account service yet.");
  };

  return (
    <header className="h-17.5 shrink-0 bg-paper border-b border-border px-8 flex items-center gap-5">
      <div className="relative flex-1 max-w-105">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3.5">
          <Search size={16} className="text-mute"/>
        </div>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={find.onKeyDown}
          placeholder={config.searchPlaceholder}
          className="block w-full py-2.5 ps-10 pe-16 bg-canvas border border-border rounded-[10px] text-[13.5px] text-ink placeholder:text-mute focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent"
        />
        {query.trim() && (
          <span className={cn("absolute inset-y-0 end-3.5 flex items-center text-[11px] font-bold font-mono pointer-events-none", find.count ? "text-ink-3" : "text-err")}>
            {find.current}/{find.count}
          </span>
        )}
      </div>

      <div className="flex-1"/>

      {config.environment && <Pill tone="green" dot>{config.environment}</Pill>}

      {config.leaderboard && (
        <LeaderboardButton entries={config.leaderboard.entries} href={`${config.basePath}/${config.leaderboard.slug}`} className={ICON_BTN}/>
      )}
      {config.inbox && (
        <Link
          href={`${config.basePath}/inbox`}
          aria-label="Inbox"
          title="Inbox"
          className={cn(ICON_BTN, pathname === `${config.basePath}/inbox` && "bg-accent-mist border-accent text-accent-deep")}
        >
          <Inbox size={16}/>
          {!!config.inbox.badge && (
            <span className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 px-1 bg-accent text-white text-[10px] font-extrabold font-mono rounded-full border-2 border-paper flex items-center justify-center">
              {config.inbox.badge}
            </span>
          )}
        </Link>
      )}
      <button type="button" aria-label="Change password" title="Change password" onClick={() => setShowPasswordForm(true)} className={ICON_BTN}>
        <Settings size={16}/>
      </button>
      <button type="button" aria-label="Notifications" className={ICON_BTN}>
        <Bell size={16}/>
        <span className="absolute top-2 right-2 size-2 bg-err rounded-full border-2 border-paper"/>
      </button>

      <div className="flex items-center gap-2.5">
        <Avatar name={viewer.name} size={40}/>
        <div>
          <div className="text-[13.5px] font-bold text-ink tracking-[-0.2px] leading-[1.1]">{viewer.name}</div>
          <div className={cn("text-[11px] mt-0.5", config.viewerSubtitleAccent ? "text-accent font-bold" : "text-ink-3")}>
            {config.viewerSubtitle}
          </div>
        </div>
      </div>

      {showPasswordForm && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(15,23,42,0.5)] p-5"
          onClick={closePasswordForm}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
            className="w-full max-w-120 overflow-hidden rounded-2xl bg-paper shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            onClick={event => event.stopPropagation()}
          >
            <div className="relative border-b border-border px-6 py-5">
              <button
                type="button"
                aria-label="Close change password form"
                onClick={closePasswordForm}
                className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-lg border-0 bg-canvas text-ink-2 hover:bg-accent-mist"
              >
                <X size={16}/>
              </button>
              <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[2px] text-accent">Account security</div>
              <h2 id="change-password-title" className="text-[20px] font-extrabold tracking-[-0.6px] text-ink">Change password</h2>
              <p className="mt-1 text-[12.5px] text-ink-3">Enter your current password and choose a new one.</p>
            </div>

            <form onSubmit={submitPasswordForm} className="flex flex-col gap-4 p-6">
              <div>
                <label htmlFor="current-password" className="mb-1.5 block text-[12px] font-bold text-ink-2">Current password</label>
                <input
                  id="current-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={currentPassword}
                  onChange={event => setCurrentPassword(event.target.value)}
                  className={PASSWORD_INPUT}
                />
              </div>
              <div>
                <label htmlFor="new-password" className="mb-1.5 block text-[12px] font-bold text-ink-2">New password</label>
                <input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={newPassword}
                  onChange={event => setNewPassword(event.target.value)}
                  className={PASSWORD_INPUT}
                />
                <p className="mt-1 text-[11px] text-ink-3">Use at least 8 characters.</p>
              </div>
              <div>
                <label htmlFor="confirm-password" className="mb-1.5 block text-[12px] font-bold text-ink-2">Confirm new password</label>
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                  className={PASSWORD_INPUT}
                />
              </div>
              {passwordMessage && (
                <p role={passwordMessage.startsWith("The new password") ? "alert" : "status"} className="text-[12px] text-ink-2">
                  {passwordMessage}
                </p>
              )}
              <div className="flex justify-end gap-2 pt-1">
                <Btn variant="ghost" onClick={closePasswordForm}>Cancel</Btn>
                <Btn type="submit">Change password</Btn>
              </div>
            </form>
          </section>
        </div>
      )}
    </header>
  );
};
