import React, { MouseEvent } from "react";
import { Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type TreeIconOpenProps = {
  hasChild: boolean;
  isOpen: boolean;
  onOpen: (e: MouseEvent) => void;
};

export function TreeIconOpen({ hasChild, isOpen, onOpen }: TreeIconOpenProps) {
  return (
    <Box width={40}>
      {hasChild && (
        <IconButton onClick={onOpen}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      )}
    </Box>
  );
}
