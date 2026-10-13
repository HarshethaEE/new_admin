"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card } from "./Card";

export interface DonutKPIProps {
  label: string;
  used: number;
  total: number;
  color: string;
  unit: string;
}

export const DonutKPI = ({ label, used, total, color, unit }: DonutKPIProps) => {
  const data = [{ v: used }, { v: total - used }];
  return (
    <Card padding={18} className="bg-linear-145 from-accent-mist from-0% to-paper to-65%">
      <div className="text-[13px] text-ink-2 font-semibold tracking-[-0.1px]">{label}</div>
      <div className="flex items-center gap-3.5 mt-2.5">
        <div className="relative size-18 shrink-0">
          <ResponsiveContainer width={72} height={72}>
            <PieChart>
              <Pie data={data} dataKey="v" innerRadius={26} outerRadius={34} startAngle={90} endAngle={-270} stroke="none">
                <Cell fill={color}/>
                <Cell fill="var(--brand-accent-soft)"/>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <div className="text-[17px] font-extrabold text-ink tracking-[-0.5px] font-mono leading-none">{used}</div>
            <div className="text-[10px] font-bold text-mute mt-px">/{total}</div>
          </div>
        </div>
        <div>
          <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Used</div>
          <div className="text-[11px] text-ink-3 font-bold mt-2.5">{unit}</div>
        </div>
      </div>
    </Card>
  );
};
