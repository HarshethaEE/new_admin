"use client";

import { MapPin, UserCog, UserPlus } from "lucide-react";
import { Avatar, Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { CLIENTS } from "@/features/clients";
import { typeIcon } from "@/features/clients";

export const AccessControl = () => (
  <div>
    <PageHeader title="Access Control" sub="Manage who can access each client's dashboard" action={<Btn variant="primary" icon={UserPlus}>Invite user</Btn>}/>

    <Card padding={0}>
      <div className="py-3.5 px-5 border-b border-b-border">
        <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Dashboard access by client</div>
      </div>
      {CLIENTS.filter(c => c.status === "live").map((c, i, arr) => {
        const Icon = typeIcon(c.type);
        return (
          <div key={c.id} className={`grid grid-cols-[48px_2fr_1fr_1fr_1fr_120px] gap-3.5 items-center py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
            <div className="w-9 h-9 rounded-[9px] bg-p-soft text-p-deep flex items-center justify-center">
              <Icon size={17}/>
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-ink">{c.name}</div>
              <div className="text-[11px] text-ink-3 mt-0.5 flex items-center gap-1.25"><MapPin size={10}/>{c.loc}</div>
            </div>
            <div className="flex items-center">
              {Array.from({ length: Math.min(4, c.usersWithAccess) }).map((_, j) => (
                <div key={j} className={`${(j === 0 ? "ml-0" : "-ml-1.5")}`}>
                  <Avatar name={`U${j}`} size={26} tone={j === 0 ? "primary" : j === 1 ? "amber" : "info"}/>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[10.5px] text-ink-3 font-extrabold tracking-[1.1px] uppercase">Users</div>
              <div className="text-[15px] font-extrabold text-ink font-mono mt-0.5">{c.usersWithAccess}</div>
            </div>
            <Pill tone="ok" dot>Active</Pill>
            <Btn variant="ghost" size="sm" icon={UserCog}>Manage</Btn>
          </div>
        );
      })}
    </Card>
  </div>
);
