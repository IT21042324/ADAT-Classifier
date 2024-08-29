import { Avatar } from "@mui/material";
import { common, deepPurple, grey } from "@mui/material/colors";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./header.module.css";
import { dropDownItems, titleDropdownItems } from "./headerImportItems";
import { useState, useEffect, useRef } from "react";
import { IoMdMenu } from "react-icons/io";

export const Header = () => {
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [isTitleClicked, setIsTitleClicked] = useState(false);

  const avatarDropdownRef = useRef(null);
  const titleDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      avatarDropdownRef.current &&
      !avatarDropdownRef.current.contains(event.target)
    ) {
      setIsAvatarClicked(false);
    }
    if (
      titleDropdownRef.current &&
      !titleDropdownRef.current.contains(event.target)
    ) {
      setIsTitleClicked(false);
    }
  };

  useEffect(() => {
    if (isAvatarClicked || isTitleClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAvatarClicked, isTitleClicked]);

  return (
    <div className={styles.container}>
      <div
        className={styles.titleContainer}
        onClick={() => setIsTitleClicked((prev) => !prev)}
        ref={titleDropdownRef}
      >
        <div className={styles.titleBox}>
          <h1 className={styles.title}>
            <span className={styles.name}>ADAT </span>
            Classifier
          </h1>
          <MdKeyboardArrowDown className={styles.arrow} />
        </div>

        {isTitleClicked && (
          <div
            className={styles.titleDropdown}
            onClick={(e) => e.stopPropagation()} // Stop click event propagation
          >
            {titleDropdownItems.map((itm) => {
              return (
                <div className={styles.titleDropdownItem} key={itm.title}>
                  {itm.icon}
                  <div className={styles.featureContainer}>
                    {itm.title}
                    <div className={styles.featureDescription}>
                      {itm.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.avatarContainer} ref={avatarDropdownRef}>
        <Avatar
          className={styles.avatar}
          style={{ background: deepPurple[500] }}
          onClick={() => setIsAvatarClicked((prev) => !prev)}
        >
          A
        </Avatar>

        <IoMdMenu
          className={styles.avatarSmallScreen}
          style={{ background: grey[800], fontSize: "1.5em" }}
          color="white"
          onClick={() => setIsAvatarClicked((prev) => !prev)}
        />

        {isAvatarClicked && (
          <div className={styles.avatarDropdown}>
            {dropDownItems.map((item) => {
              return (
                <div key={item.text} className={styles.avatarDropdownItem}>
                  {item.icon}
                  {item.text}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
