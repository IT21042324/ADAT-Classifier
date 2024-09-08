import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { IoMdMenu } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthContextProvider from "../context/useAuth";
import { UseHeaderFunctions } from "../useHook/useHeaderFunctions";
import styles from "./header.module.css";
import { dropDownItems, titleDropdownItems } from "./headerImportItems";

export const Header = () => {
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [isTitleClicked, setIsTitleClicked] = useState(false);

  const location = useLocation(); // Track current location
  const avatarDropdownRef = useRef(null);
  const titleDropdownRef = useRef(null);

  const navigate = useNavigate();

  // Retrieve the username from AuthContext
  const { userName } = useAuthContextProvider(); // Get the username from context

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

  const { handleHeaderFunctions } = UseHeaderFunctions();

  // Function to get initials from username
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0]; // First letter of first and last name
    } else {
      return name[0]; // First letter of the name
    }
  };

  // Filter out the current path from the dropdown items
  const filteredTitleDropdownItems = titleDropdownItems.filter(
    (item) => item.navigate !== location.pathname
  );

  // useEffect to set body overflow-y property
  useEffect(() => {
    if (location.pathname === "/classify") {
      document.body.style.overflowY = "hidden"; // Hide vertical scrolling
    } else {
      document.body.style.overflowY = "auto"; // Reset to auto for other pages
    }

    return () => {
      // Cleanup when the component is unmounted
      document.body.style.overflowY = "auto";
    };
  }, [location.pathname]); // Run whenever the route changes

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
            {filteredTitleDropdownItems.map((itm) => {
              return (
                <div
                  className={styles.titleDropdownItem}
                  key={itm.title}
                  onClick={() => {
                    navigate(itm.navigate);
                    setIsTitleClicked(false); // Close the dropdown after navigation
                  }}
                >
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
          {userName ? getInitials(userName) : "A"}{" "}
          {/* Show username initials */}
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
                <div
                  key={item.text}
                  className={styles.avatarDropdownItem}
                  onClick={() => handleHeaderFunctions(item.function)}
                >
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
