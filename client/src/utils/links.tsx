import { AiOutlineFileSearch, AiFillProfile } from "react-icons/ai";
import { BsGraphUp, BsNewspaper } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { NavLinksProps } from "../interfaces/NavLinksProps";

export const links: NavLinksProps[] = [
  {
    text: "add job",
    path: ".",
    icon: <BsNewspaper />,
  },
  {
    text: "all jobs",
    path: "all-jobs",
    icon: <AiOutlineFileSearch />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <BsGraphUp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <AiFillProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdOutlineAdminPanelSettings />,
  },
];
