import React, { useCallback } from "react";

export default function usePopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleOpen = useCallback((el: HTMLElement) => {
    setAnchorEl(el);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    open: Boolean(anchorEl),
    anchorEl,
    handleOpen,
    handleClose,
    setAnchorEl,
  };
}
