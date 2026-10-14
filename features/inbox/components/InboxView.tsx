"use client";

import { useEffect, useRef, useState } from "react";
import { Check, CheckCheck, MessageSquare, Mic, MoreVertical, Paperclip, Phone, Plus, Search, Send, Smile, Users, Video } from "lucide-react";
import { useTheme } from "@/shared/context/DashboardContext";
import { Avatar, Btn, Card, PageHeader } from "@/shared/ui";
import type { Chat, ChatMessage } from "../types";

/* ══════════════════════════════════════════════════════════════════════
   INBOX / CHAT — WhatsApp style. Shared by Employee + HR Management.
   ══════════════════════════════════════════════════════════════════════ */

export interface InboxViewProps {
  chats: Chat[];
  messages: ChatMessage[];
  /** Chat selected on first render. */
  initialChatId?: string;
  /** "N online" shown in a group chat header. */
  groupOnlineCount: number;
  /** Status line for an offline direct chat. */
  lastSeenLabel: string;
}

export const InboxView = ({ chats, messages, initialChatId, groupOnlineCount, lastSeenLabel }: InboxViewProps) => {
  const T = useTheme();
  const [selected, setSelected] = useState<Chat | undefined>(
    () => chats.find(c => c.id === initialChatId) ?? chats[0]
  );
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only the message thread (scrollIntoView would also scroll the page).
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [selected]);

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <PageHeader
        title="Inbox"
        sub={`${chats.filter(c => c.unread> 0).length} unread · ${chats.filter(c => c.isGroup).length} groups · ${chats.filter(c => !c.isGroup).length} direct chats`}
        action={<Btn variant="primary" icon={Plus}>New chat</Btn>}
      />

      <Card padding={0} className="flex-1 min-h-105 overflow-hidden">
        <div className="grid grid-cols-[340px_1fr] grid-rows-1 h-full">
          {/* Chat list — left */}
          <div className="border-r border-r-border bg-canvas flex flex-col min-h-0">
            {/* Search */}
            <div className="p-3.5 border-b border-b-border bg-paper">
              <div className="flex items-center gap-2.25 bg-canvas border border-border rounded-[10px] py-2 px-3">
                <Search size={14} color={T.mute}/>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search chats" className="flex-1 border-0 outline-none bg-transparent font-sans text-[13px] text-ink"/>
              </div>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map(c => (
                <button key={c.id} onClick={() => setSelected(c)} className={`w-full flex items-center gap-2.75 py-3 px-4 border-0 border-b border-b-border cursor-pointer text-left font-sans ${(selected?.id === c.id ? "bg-g-mist" : "bg-transparent hover:bg-paper")} ${(selected?.id === c.id ? "border-l-3 border-l-g" : "border-l-3 border-l-transparent")}`}>
                  {c.isGroup ? (
                    <div className="w-10.5 h-10.5 rounded-full bg-g-soft text-g-deep flex items-center justify-center shrink-0">
                      <Users size={18}/>
                    </div>
                  ) : (
                    <Avatar name={c.name} size={42} online={c.online} tone={c.tone}/>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <div className={`text-[13px] text-ink whitespace-nowrap overflow-hidden text-ellipsis ${(c.unread> 0 ? "font-extrabold" : "font-bold")}`}>
                        {c.pinned && <span className="mr-1">📌</span>}{c.name}
                      </div>
                      <span className={`text-[10.5px] shrink-0 ml-1.5 ${(c.unread> 0 ? "text-g-deep" : "text-ink-3")} ${(c.unread> 0 ? "font-bold" : "font-medium")}`}>{c.when}</span>
                    </div>
                    <div className="flex justify-between items-center mt-0.75">
                      <div className={`text-[11.5px] whitespace-nowrap overflow-hidden text-ellipsis flex-1 ${(c.unread> 0 ? "text-ink-2" : "text-ink-3")} ${(c.unread> 0 ? "font-semibold" : "font-medium")}`}>
                        {c.last}
                      </div>
                      {c.unread> 0 && (
                        <span className="bg-g text-white text-[10px] font-extrabold font-mono py-px px-1.75 rounded-full min-w-4.5 text-center ml-1.5 shrink-0">{c.unread}</span>
                      )}
                    </div>
                    {c.isGroup && (
                      <div className="text-[10px] text-mute mt-0.75 flex items-center gap-0.75">
                        <Users size={9}/>{c.members} members
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window — right */}
          {selected ? (
            <div className="flex flex-col min-h-0 bg-[#F7F5F0]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${T.border} 1px, transparent 0)`, backgroundSize: "24px 24px" }}>
              {/* Chat header */}
              <div className="py-3.5 px-5 bg-paper border-b border-b-border flex items-center gap-3">
                {selected.isGroup ? (
                  <div className="w-10 h-10 rounded-full bg-g-soft text-g-deep flex items-center justify-center">
                    <Users size={17}/>
                  </div>
                ) : (
                  <Avatar name={selected.name} size={40} online={selected.online} tone={selected.tone}/>
                )}
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-ink tracking-[-0.2px]">{selected.name}</div>
                  <div className={`text-[11px] mt-0.5 font-semibold ${(selected.online ? "text-g-deep" : "text-ink-3")}`}>
                    {selected.isGroup ? `${selected.members} members · ${groupOnlineCount} online` : selected.online ? "Online" : lastSeenLabel}
                  </div>
                </div>
                <button className="w-8.5 h-8.5 bg-canvas border border-border rounded-lg cursor-pointer flex items-center justify-center">
                  <Phone size={15} color={T.ink2}/>
                </button>
                <button className="w-8.5 h-8.5 bg-canvas border border-border rounded-lg cursor-pointer flex items-center justify-center">
                  <Video size={15} color={T.ink2}/>
                </button>
                <button className="w-8.5 h-8.5 bg-canvas border border-border rounded-lg cursor-pointer flex items-center justify-center">
                  <MoreVertical size={15} color={T.ink2}/>
                </button>
              </div>

              {/* Messages */}
              <div ref={threadRef} className="flex-1 overflow-y-auto py-5 px-6">
                <div className="text-center mb-4">
                  <span className="bg-[rgba(255,255,255,0.9)] py-1 px-2.75 rounded-full text-[10.5px] text-ink-3 font-bold tracking-[0.3px]">Today</span>
                </div>
                {messages.map((m, i) => (
                  <div key={i} className={`flex mb-2 ${(m.me ? "justify-end" : "justify-start")}`}>
                    <div className={`max-w-[70%] py-2.25 px-3.25 shadow-[0_1px_2px_rgba(0,0,0,0.08)] text-[13.5px] leading-[1.4] ${(m.me ? "bg-g" : "bg-paper")} ${(m.me ? "text-white" : "text-ink")} ${(m.me ? "rounded-[14px_14px_4px_14px]" : "rounded-[14px_14px_14px_4px]")}`}>
                      <div>{m.text}</div>
                      <div className={`text-[10px] mt-1 flex justify-end items-center gap-0.75 ${(m.me ? "text-[rgba(255,255,255,0.75)]" : "text-ink-3")}`}>
                        {m.when}
                        {m.me && (m.status === "read" ? <CheckCheck size={11}/> : <Check size={11}/>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message input */}
              <div className="py-3.5 px-5 bg-paper border-t border-t-border flex items-center gap-2.5">
                <button className="w-9 h-9 bg-canvas border border-border rounded-lg cursor-pointer flex items-center justify-center">
                  <Paperclip size={16} color={T.ink2}/>
                </button>
                <button className="w-9 h-9 bg-canvas border border-border rounded-lg cursor-pointer flex items-center justify-center">
                  <Smile size={16} color={T.ink2}/>
                </button>
                <input
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder="Type a message"
 className="flex-1 py-2.25 px-3.5 bg-canvas border border-border rounded-[10px] font-sans text-[13.5px] text-ink outline-none"
                />
                <button className="w-10 h-10 bg-g border border-g rounded-[10px] cursor-pointer flex items-center justify-center">
                  {draft ? <Send size={16} color="#fff"/> : <Mic size={16} color="#fff"/>}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-canvas">
              <div className="text-center">
                <MessageSquare size={48} color={T.mute} className="mt-0 mr-auto mb-3 ml-auto"/>
                <div className="text-[15px] font-bold text-ink-2">Select a chat to start messaging</div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
