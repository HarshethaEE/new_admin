"use client";

import { AlertTriangle, Download, Edit3, MapPin, RefreshCw } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { GEOFENCE_FLAGS, LATE_ARRIVALS, LIVE_FLOOR, SHIFT_TODAY } from "../data/management";
import { ORG } from "@/features/employees";

/* ══════════════════════════════════════════════════════════════════════
   §05 · ATTENDANCE OPERATIONS
   ══════════════════════════════════════════════════════════════════════ */

export const AttendanceOps = () => (
  <div>
    <PageHeader
      title="Attendance Operations"
      sub="Live floor status · anomalies · regularizations · shift management"
      action={
        <div className="flex gap-2">
          <Btn variant="ghost" icon={Download}>Day report</Btn>
          <Btn variant="primary" icon={RefreshCw}>Refresh</Btn>
        </div>
      }
    />

    {/* Live floor status */}
    <div className="grid grid-cols-5 gap-3.5 mb-5">
      <Card padding={16} className="border-l-4 border-l-g">
        <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Present at site</div>
        <div className="text-[24px] font-extrabold text-ink mt-1.5 font-mono tracking-[-0.6px]">{LIVE_FLOOR.present}</div>
        <div className="text-[11.5px] text-ink-3 mt-1">of {ORG.total}</div>
      </Card>
      <Card padding={16} className="border-l-4 border-l-a">
        <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Working from home</div>
        <div className="text-[24px] font-extrabold text-ink mt-1.5 font-mono tracking-[-0.6px]">{LIVE_FLOOR.wfh}</div>
        <div className="text-[11.5px] text-ink-3 mt-1">within policy</div>
      </Card>
      <Card padding={16} className="border-l-4 border-l-b">
        <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">On leave</div>
        <div className="text-[24px] font-extrabold text-ink mt-1.5 font-mono tracking-[-0.6px]">{LIVE_FLOOR.onLeave}</div>
        <div className="text-[11.5px] text-ink-3 mt-1">approved</div>
      </Card>
      <Card padding={16} className="border-l-4 border-l-err">
        <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Late arrivals</div>
        <div className="text-[24px] font-extrabold text-err mt-1.5 font-mono tracking-[-0.6px]">{LIVE_FLOOR.late}</div>
        <div className="text-[11.5px] text-ink-3 mt-1">needs review</div>
      </Card>
      <Card padding={16} className="border-l-4 border-l-mute">
        <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Not marked</div>
        <div className="text-[24px] font-extrabold text-ink mt-1.5 font-mono tracking-[-0.6px]">{LIVE_FLOOR.notMarked}</div>
        <div className="text-[11.5px] text-ink-3 mt-1">awaiting check-in</div>
      </Card>
    </div>

    {/* Late arrivals + Geofence anomalies */}
    <div className="grid grid-cols-[1.5fr_1fr] gap-4.5 mb-5">
      <Card padding={0}>
        <div className="py-4 px-5 border-b border-b-border flex justify-between items-center">
          <div>
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Late arrivals today</div>
            <div className="text-[11.5px] text-ink-3 mt-0.5">{LATE_ARRIVALS.length} people checked in after 9:00 AM</div>
          </div>
          <Pill tone="err" dot>{LATE_ARRIVALS.length}</Pill>
        </div>
        {LATE_ARRIVALS.map((l, i, arr) => (
          <div key={i} className={`grid grid-cols-[40px_1.3fr_1fr_80px_1fr_90px] gap-3 items-center py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
            <Avatar name={l.emp} size={32}/>
            <div>
              <div className="text-[13px] font-bold text-ink">{l.emp}</div>
              <div className="text-[11px] text-ink-3 mt-px">{l.dept}</div>
            </div>
            <div className="flex items-center gap-1.25 text-[11.5px] text-ink-2">
              <MapPin size={11} color={T.mute}/>{l.loc}
            </div>
            <span className="font-mono text-[12px] text-ink font-bold">{l.checkIn}</span>
            <Pill tone="err">+{l.lateBy}</Pill>
            <span className="text-[11.5px] text-ink-3" style={{ fontStyle: l.reason === "—" ? "italic" : "normal" }}>{l.reason}</span>
          </div>
        ))}
      </Card>

      <Card padding={0}>
        <div className="py-4 px-5 border-b border-b-border flex justify-between items-center">
          <div>
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Geofence anomalies</div>
            <div className="text-[11.5px] text-ink-3 mt-0.5">Punch-ins outside allowed location</div>
          </div>
          <Pill tone="amber" dot>{GEOFENCE_FLAGS.length}</Pill>
        </div>
        {GEOFENCE_FLAGS.map((f, i, arr) => (
          <div key={i} className={`flex gap-3 py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
            <div className="w-8 h-8 rounded-lg bg-a-soft text-a-dark flex items-center justify-center shrink-0">
              <AlertTriangle size={15}/>
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-ink">{f.emp}</div>
              <div className="text-[11px] text-ink-2 mt-0.75">{f.issue}</div>
              <div className="text-[11px] text-ink-3 mt-0.75">{f.loc} · {f.when}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>

    {/* Shift management */}
    <Card padding={22}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Today's shifts</div>
          <div className="text-[11.5px] text-ink-3 mt-0.5">Active shift coverage across departments</div>
        </div>
        <Btn variant="ghost" size="sm" icon={Edit3}>Manage shifts</Btn>
      </div>
      <div className="grid grid-cols-4 gap-3.5">
        {SHIFT_TODAY.map((s, i) => (
          <div key={i} className="p-4 bg-canvas border border-border rounded-[10px]" style={{ borderLeft: `3px solid ${s.color}` }}>
            <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">{s.shift}</div>
            <div className="text-[24px] font-extrabold text-ink mt-1.5 font-mono tracking-[-0.6px]">{s.count}</div>
            <div className="text-[11.5px] text-ink-3 mt-1">{s.dept}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);
