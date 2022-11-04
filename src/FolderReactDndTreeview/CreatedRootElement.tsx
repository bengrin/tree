import React from "react";
import {
  Button,
  ButtonGroup,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { listConfig } from "./CustomNode/TreeMenu";
import { NodeModel } from "@minoru/react-dnd-treeview";

type CreatedRootElementProps = {
  onCreateConfig: (configId: string, id: NodeModel["id"]) => void;
  onCreateFolder: (id: NodeModel["id"]) => void;
};

export const CreatedRootElement = ({
  onCreateFolder,
  onCreateConfig,
}: CreatedRootElementProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleCreateFolder = () => {
    onCreateFolder(0);
  };

  const handleCreateConfig = (option: { name: string; value: string }) => {
    onCreateConfig(option.value, 0);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <ButtonGroup
        size="small"
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleCreateFolder}>Create folder</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          Create config
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {listConfig.map((option) => (
                    <MenuItem
                      key={option.value}
                      onClick={() => handleCreateConfig(option)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
