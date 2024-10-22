import { CgProfile } from "react-icons/cg";
import { IoLogOutSharp, IoSettings } from "react-icons/io5";

import { PiScanSmiley } from "react-icons/pi";
import { RiAiGenerate } from "react-icons/ri";
import styles from "./header.module.css";

export const dropDownItems = [
  {
    text: "Profile",
    icon: <CgProfile className={styles.avatarDropdownIcon} />,
    function: "None",
  },
  {
    text: "Settings",
    icon: <IoSettings className={styles.avatarDropdownIcon} />,
  },
  {
    text: "Logout",
    icon: <IoLogOutSharp className={styles.avatarDropdownIcon} />,
    function: "Logout",
  },
];

export const titleDropdownItems = [
  {
    icon: <RiAiGenerate className={styles.titleIcon} />,
    title: "SynthGen",
    description: "Generate Synthetic Acne Images",
    navigate: "/synth",
  },
  {
    icon: <PiScanSmiley className={styles.titleIcon} />,
    title: "Acne Classifier",
    description: "Classify Acne Images",
    navigate: "/classify",
  },
];
