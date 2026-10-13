import type { Metadata } from "next";
import { InboxView, employeeInbox } from "@/features/inbox";

export const metadata: Metadata = { title: "Inbox" };

export default function EmployeeInboxPage() {
  return (
    <InboxView
      chats={employeeInbox.CHATS}
      messages={employeeInbox.CHAT_MESSAGES}
      initialChatId="c1"
      groupOnlineCount={3}
      lastSeenLabel="Last seen today at 10:12 AM"
    />
  );
}
