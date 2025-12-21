import { BookCall } from "@/registry/book-call";

export default function BookCallDemo() {
  return (
    <BookCall
      meetingLink="https://cal.com/your-username/15min"
      profileImage="https://assets.ommishra.me/images/om-avatar.jpg"
      text="Book a Call"
    />
  );
}
