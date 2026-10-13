import { Battery, Gauge, Sun, Thermometer, Wind, Zap } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";

export const DEVICES_SPLIT = [
  { type: "Smart Meters",    count: 184, color: T.p,      icon: Gauge },
  { type: "HVAC Controllers", count: 142, color: T.b,      icon: Thermometer },
  { type: "Solar Inverters", count: 128, color: T.a,      icon: Sun },
  { type: "Battery Systems", count: 48,  color: T.pLight, icon: Battery },
  { type: "EV Chargers",     count: 86,  color: T.gDeep,  icon: Zap },
  { type: "Air Handlers",    count: 112, color: T.bDark,  icon: Wind },
];
