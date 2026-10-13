"use client";

import { Globe, Plus } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader } from "@/shared/ui";

export const DigitalTwin = () => (
  <div>
    <PageHeader title="Digital Twin" sub="3D models of client sites with live telemetry overlay"/>
    <Card padding={40} className="text-center">
      <Globe size={48} color={T.p} className="mt-0 mr-auto mb-4 ml-auto"/>
      <div className="text-[16px] font-bold text-ink">4 digital twins active</div>
      <div className="text-[13px] text-ink-3 mt-1.5">Metalware Delhi · Infosys EC-city · ITC Chola · Lemon Tree network</div>
      <Btn variant="primary" className="mt-4" icon={Plus}>Build new twin</Btn>
    </Card>
  </div>
);
