import { BookCall } from "@/registry/book-call";

export default function BookCallDemo02() {
  return (
    <BookCall
      meetingLink="https://cal.com/your-username/30min"
      profileImage="https://assets.ommishra.me/images/om-avatar.jpg"
      text="Schedule a Meeting"
      profileAlt="You"
    />
  );
}
