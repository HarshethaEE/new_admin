import type { AvatarTone } from "@/shared/ui";

export interface Chat {
  id: string;
  name: string;
  isGroup: boolean;
  members?: number;
  last: string;
  when: string;
  unread: number;
  pinned?: boolean;
  online?: boolean;
  tone: AvatarTone;
}

export interface ChatMessage {
  from: string;
  me: boolean;
  text: string;
  when: string;
  status?: "read" | "delivered";
}
