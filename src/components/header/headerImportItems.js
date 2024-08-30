import { CgProfile } from "react-icons/cg";
import { IoLogOutSharp, IoSettings } from "react-icons/io5";

import styles from "./header.module.css";
import { RiAiGenerate } from "react-icons/ri";

export const dropDownItems = [
  {
    text: "Profile",
    icon: <CgProfile className={styles.avatarDropdownIcon} />,
  },
  {
    text: "Settings",
    icon: <IoSettings className={styles.avatarDropdownIcon} />,
  },
  {
    text: "Logout",
    icon: <IoLogOutSharp className={styles.avatarDropdownIcon} />,
  },
];

export const titleDropdownItems = [
  {
    icon: <RiAiGenerate className={styles.titleIcon} />,
    title: "ADAT Plus",
    description: "Generate Synthetic Acne Images",
  },
];
