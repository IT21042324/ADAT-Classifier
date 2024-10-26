import { CgProfile } from "react-icons/cg";
import { IoLogOutSharp, IoSettings } from "react-icons/io5";
import { MdDocumentScanner } from "react-icons/md";
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

  {
    icon: <MdDocumentScanner className={styles.titleIcon} />,
    title: "Acne Severity",
    description: "View Severity Report",
    navigate: "/severity",
  },

  {
    icon: <MdDocumentScanner className={styles.titleIcon} />,
    title: "Explain Classification",
    description: "View Explaination",
    navigate: "/explainableAI",
  },
];
