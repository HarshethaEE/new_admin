"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Check, CheckCheck, Cloud, FolderOpen, ListChecks, MessageSquare, MessageSquarePlus, Mic, Paperclip, Search, Send, Users, X as XIcon } from "lucide-react";
import { useTheme } from "@/shared/context/DashboardContext";
import { useFindInPage } from "@/shared/lib/useFindInPage";
import { Avatar } from "@/shared/ui";
import { AssignTaskModal, PROJECTS, TASKS, TEAM_MEMBERS, type NewTask } from "@/features/projects";
import type { Chat, ChatMessage } from "../types";

/* ══════════════════════════════════════════════════════════════════════
   INBOX / CHAT — messenger style. Shared by Employee + HR Management.
   ══════════════════════════════════════════════════════════════════════ */

export interface InboxViewProps {
  chats: Chat[];
  messages: ChatMessage[];
  /** Signed-in user shown at the top of the chat list. */
  user: { name: string; role: string };
  /** Show the AWS Access shortcut under the chat list. */
  showAwsAccess?: boolean;
  /** Chat selected on first render. */
  initialChatId?: string;
  /** "N online" shown in a group chat header. */
  groupOnlineCount: number;
  /** Status line for an offline direct chat. */
  lastSeenLabel: string;
}

const iconBtn = "w-9 h-9 rounded-lg border-0 bg-transparent cursor-pointer flex items-center justify-center hover:bg-canvas";

export const InboxView = ({ chats, messages, user, showAwsAccess = false, initialChatId, groupOnlineCount, lastSeenLabel }: InboxViewProps) => {
  const T = useTheme();
  const [selected, setSelected] = useState<Chat | undefined>(
    () => chats.find(c => c.id === initialChatId) ?? chats[0]
  );
  const [thread, setThread] = useState<ChatMessage[]>(messages);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [showTask, setShowTask] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const [findQuery, setFindQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const [taskCount, setTaskCount] = useState(0);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only the message thread (scrollIntoView would also scroll the page).
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [selected, thread]);

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const listFind = useFindInPage(listRef, search, [filteredChats.length]);
  const chatFind = useFindInPage(threadRef, findOpen ? findQuery : "", [thread, selected]);

  const closeFind = () => { setFindOpen(false); setFindQuery(""); };

  const postMessage = (text: string) => {
    const when = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setThread(prev => [...prev, { from: "me", me: true, text, when, status: "delivered" }]);
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    postMessage(text);
    setDraft("");
  };

  // Preselect the person you're chatting with when they're on the team list.
  const chatAssignee = selected && !selected.isGroup
    ? TEAM_MEMBERS.find(m => selected.name.startsWith(m.name))?.id ?? ""
    : "";
  const nextTaskId = Math.max(...TASKS.map(t => Number(t.id.replace(/\D/g, "")) || 0)) + 1 + taskCount;

  const handleTaskCreate = (created: NewTask[]) => {
    const t = created[0];
    const client = PROJECTS.find(p => p.id === t.project)?.client;
    postMessage(`📋 Task assigned: ${t.title} · ${client} · due ${t.dueFull}`);
    setTaskCount(n => n + created.length);
    setShowTask(false);
  };

  return (
    <div className="flex-1 min-h-0 bg-paper">
      <div className="grid grid-cols-[320px_1fr] grid-rows-1 h-full">
        {/* Chat list — left */}
        <div className="border-r border-r-border bg-paper flex flex-col min-h-0">
          {/* Signed-in user */}
          <div className="py-3.5 px-4 border-b border-b-border flex items-center gap-3">
            <Avatar name={user.name} size={38} tone="green"/>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-extrabold text-ink tracking-[-0.2px] truncate">{user.name}</div>
              <div className="text-[11.5px] text-ink-3 font-semibold truncate">{user.role}</div>
            </div>
            <button className={iconBtn} title="New chat"><MessageSquarePlus size={18} color={T.ink2}/></button>
            <button className={iconBtn} title="Shared files"><FolderOpen size={18} color={T.ink2}/></button>
          </div>

          {/* Search */}
          <div className="p-3">
            <div className="flex items-center gap-2.25 bg-canvas rounded-full py-2.25 px-3.5">
              <Search size={15} color={T.mute}/>
              <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={listFind.onKeyDown} placeholder="Search chats" className="flex-1 border-0 outline-none bg-transparent font-sans text-[13px] text-ink"/>
            </div>
          </div>

          {/* Chat list */}
          <div ref={listRef} className="flex-1 overflow-y-auto">
            {filteredChats.map(c => {
              const on = selected?.id === c.id;
              return (
                <button key={c.id} onClick={() => setSelected(c)} className={`w-full flex items-center gap-3 py-3 px-4 border-0 border-l-3 cursor-pointer text-left font-sans ${(on ? "bg-g-mist border-l-g" : "bg-transparent border-l-transparent hover:bg-g-bg")}`}>
                  {c.isGroup ? (
                    <div className="w-10.5 h-10.5 rounded-full bg-g-soft text-g-deep flex items-center justify-center shrink-0">
                      <Users size={18}/>
                    </div>
                  ) : (
                    <Avatar name={c.name} size={42} online={c.online} tone={c.tone}/>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <div className={`text-[14px] text-ink truncate ${(c.unread > 0 ? "font-extrabold" : "font-semibold")}`}>
                        {c.pinned && <span className="mr-1">📌</span>}{c.name}
                      </div>
                      <span className={`text-[11px] shrink-0 ml-1.5 ${(c.unread > 0 ? "text-g-deep font-bold" : "text-ink-3 font-medium")}`}>{c.when}</span>
                    </div>
                    <div className="flex justify-between items-center mt-0.75">
                      <div className={`text-[12.5px] truncate flex-1 ${(c.unread > 0 ? "text-ink-2 font-semibold" : "text-ink-3")}`}>
                        {c.last}
                      </div>
                      {c.unread > 0 && (
                        <span className="bg-g text-white text-[10px] font-extrabold font-mono py-px px-1.75 rounded-full min-w-4.5 text-center ml-1.5 shrink-0">{c.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* AWS access */}
          {showAwsAccess && (
            <div className="p-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-g-mist border border-g-soft cursor-pointer text-left font-sans hover:bg-g-soft">
                <div className="w-10 h-10 rounded-[10px] bg-g-soft text-g-deep flex items-center justify-center shrink-0">
                  <Cloud size={18}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-extrabold text-ink">AWS Access</span>
                    <span className="text-[9px] font-extrabold tracking-[0.8px] text-white bg-g py-0.5 px-1.5 rounded-full">BETA</span>
                  </div>
                  <div className="text-[11.5px] text-ink-3 mt-0.5 truncate">Connect to your authorized instances</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Chat window — right */}
        {selected ? (
          <div className="flex flex-col min-h-0 bg-g-bg">
            {/* Chat header */}
            <div className="py-3 px-5 bg-paper border-b border-b-border flex items-center gap-3">
              {selected.isGroup ? (
                <div className="w-10 h-10 rounded-full bg-g-soft text-g-deep flex items-center justify-center">
                  <Users size={17}/>
                </div>
              ) : (
                <Avatar name={selected.name} size={40} online={selected.online} tone={selected.tone}/>
              )}
              <div className="flex-1">
                <div className="text-[15px] font-extrabold text-ink tracking-[-0.2px]">{selected.name}</div>
                <div className={`text-[11.5px] mt-0.5 font-semibold ${(selected.online ? "text-g-deep" : "text-ink-3")}`}>
                  {selected.isGroup ? `${selected.members} members · ${groupOnlineCount} online` : selected.online ? "Online" : lastSeenLabel}
                </div>
              </div>
              {findOpen ? (
                <div className="flex items-center gap-2 bg-canvas border border-border rounded-full py-1.5 pl-3 pr-1.5 w-72">
                  <Search size={14} color={T.mute}/>
                  <input
                    autoFocus
                    value={findQuery}
                    onChange={e => setFindQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === "Escape") closeFind(); else chatFind.onKeyDown(e); }}
                    placeholder="Search in chat"
                    className="flex-1 min-w-0 border-0 outline-none bg-transparent font-sans text-[13px] text-ink"
                  />
                  {findQuery.trim() && (
                    <span className={`text-[11px] font-bold font-mono ${(chatFind.count ? "text-ink-3" : "text-err")}`}>{chatFind.current}/{chatFind.count}</span>
                  )}
                  <button onClick={closeFind} className="w-6 h-6 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center hover:bg-border" title="Close search">
                    <XIcon size={13} color={T.ink2}/>
                  </button>
                </div>
              ) : (
                <button onClick={() => setFindOpen(true)} className={iconBtn} title="Search in chat"><Search size={18} color={T.ink2}/></button>
              )}
            </div>

            {/* Messages */}
            <div ref={threadRef} className="flex-1 overflow-y-auto py-5 px-6 flex flex-col gap-2.5">
              {thread.map((m, i) => (
                <div key={i} className={`flex ${(m.me ? "justify-end" : "justify-start")}`}>
                  <div className={`max-w-[65%] py-2.5 px-3.5 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.06)] text-[14px] leading-[1.45] ${(m.me ? "bg-g text-white" : "bg-paper text-ink")}`}>
                    <div>{m.text}</div>
                    <div className={`text-[10.5px] mt-1 flex items-center gap-1 ${(m.me ? "text-[rgba(255,255,255,0.8)]" : "text-ink-3")}`}>
                      {m.when}
                      {m.me && (m.status === "read" ? <CheckCheck size={13} color="#BAE6FD"/> : <Check size={13}/>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={send} className="py-3 px-4 bg-paper border-t border-t-border flex items-center gap-1.5">
              <button type="button" className={iconBtn} title="Attach file"><Paperclip size={18} color={T.ink2}/></button>
              <button type="button" className={iconBtn} title="Voice note"><Mic size={18} color={T.ink2}/></button>
              <button type="button" onClick={() => setShowTask(true)} className={iconBtn} title="Create task"><ListChecks size={18} color={T.ink2}/></button>
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 ml-1 py-2.5 px-4 bg-canvas border border-border rounded-full font-sans text-[13.5px] text-ink outline-none focus:border-g"
              />
              <button type="submit" disabled={!draft.trim()} className="w-10 h-10 ml-1 bg-g border-0 rounded-full cursor-pointer flex items-center justify-center shrink-0 hover:bg-g-dark disabled:opacity-60 disabled:cursor-default">
                <Send size={16} color="#fff"/>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-center bg-g-bg">
            <div className="text-center">
              <MessageSquare size={48} color={T.mute} className="mx-auto mb-3"/>
              <div className="text-[15px] font-bold text-ink-2">Select a chat to start messaging</div>
            </div>
          </div>
        )}
      </div>

      {showTask && (
        <AssignTaskModal compact nextId={nextTaskId} defaultAssignee={chatAssignee} onClose={() => setShowTask(false)} onCreate={handleTaskCreate}/>
      )}
    </div>
  );
};
