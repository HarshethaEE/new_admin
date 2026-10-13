"use client";

import { Bell, Building2, Database, Globe, Key, Shield } from "lucide-react";
import { Card, PageHeader } from "@/shared/ui";

export const AdminSettings = () => (
  <div>
    <PageHeader title="Settings" sub="Organization configuration and system preferences"/>
    <div className="grid grid-cols-3 gap-4">
      {[
        { icon: Building2, label: "Organization",   desc: "Company profile, legal entities" },
        { icon: Shield,     label: "Security",      desc: "MFA, SSO, audit logs" },
        { icon: Database,   label: "Data & API",    desc: "Integrations, exports, keys" },
        { icon: Key,        label: "Roles",         desc: "Permissions and access tiers" },
        { icon: Bell,       label: "Notifications", desc: "Alerts and digest preferences" },
        { icon: Globe,       label: "Localization",  desc: "Currency, timezone, language" },
      ].map((s, i) => {
        const Icon = s.icon;
        return (
          <Card key={i} padding={20} className="cursor-pointer">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-[10px] bg-p-soft text-p-deep flex items-center justify-center">
                <Icon size={18}/>
              </div>
              <div className="text-[14px] font-bold text-ink tracking-[-0.2px]">{s.label}</div>
            </div>
            <div className="text-[12px] text-ink-3 leading-[1.5]">{s.desc}</div>
          </Card>
        );
      })}
    </div>
  </div>
);
