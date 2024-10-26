import { BiExpandAlt } from "react-icons/bi";
import styles from "./popup.module.css";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import * as React from "react";

export function ExplainableAIPopup() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className={styles.explainButton} onClick={handleOpen}>
        <BiExpandAlt />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className={styles.modalContainer}
      >
        <Fade in={open}>
          <Box className={styles.modalContentStyle}></Box>
        </Fade>
      </Modal>
    </div>
  );
}
