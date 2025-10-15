import { ArchiveIcon, ClipboardCheckIcon, InboxIcon } from "lucide-react";
import { FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";

export const navMainItems = [
  {
    title: "Wanna",
    link: "/wannas",
    icon: InboxIcon,
  },
  {
    title: "Todo",
    link: "/todos",
    icon: ClipboardCheckIcon,
  },
  {
    title: "Done",
    link: "/dones",
    icon: ArchiveIcon,
  },
];

export const navSecondaryItems = [
  {
    title: "Twitter Account",
    link: "#",
    icon: FaTwitter,
  },
  {
    title: "YouTube Channel",
    link: "#",
    icon: FaYoutube,
  },
  {
    title: "GitHub Repository",
    link: "https://github.com/ruriko5/just3",
    icon: FaGithub,
  },
];
