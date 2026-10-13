import type { Metadata } from "next";
import { InboxView, managementInbox } from "@/features/inbox";

export const metadata: Metadata = { title: "Inbox" };

export default function ManagementInboxPage() {
  return (
    <InboxView
      chats={managementInbox.CHATS}
      messages={managementInbox.CHAT_MESSAGES}
      initialChatId="c2"
      groupOnlineCount={4}
      lastSeenLabel="Last seen 10:12 AM"
    />
  );
}
