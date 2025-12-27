import React, { MouseEventHandler, useCallback } from "react";

export default function usePopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback((e) => {
    setAnchorEl(e.currentTarget);
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
