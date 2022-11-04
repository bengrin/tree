import React, { ChangeEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Stack, TextField } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { WorkflowItem } from "../types";

type TreeNameProps = {
  id: NodeModel["id"];
  text: string;
  treeData: NodeModel<WorkflowItem>[];
  enabledEdit: boolean;
  onEnabledEdit: (id: NodeModel["id"]) => void;
  onEdit: (id: NodeModel["id"], name: string) => void;
  onOpen: (e: React.MouseEvent) => void;
};

export const TreeName: React.FC<TreeNameProps> = (props) => {
  const { id, text, treeData, enabledEdit, onEnabledEdit, onEdit, onOpen } =
    props;

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setName(text);
  }, [text, enabledEdit]);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEdit = () => {
    setError("");
    onEnabledEdit(id);
  };

  const validation = (name: string) => {
    const isExist = treeData.some(
      (item) => item.text === name && item.id !== id
    );

    setError("");
    if (isExist) {
      setError("Id already exists");
      return false;
    }
    return true;
  };

  const handleEditSave = () => {
    if (validation(name)) {
      onEdit(id, name);
    }
  };
  const handelKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleEditSave();
    }
  };

  return enabledEdit ? (
    <>
      <Stack direction="row">
        <TextField
          variant="standard"
          value={name}
          onChange={handleInput}
          onKeyDown={handelKeyPress}
          helperText={error}
          error={error.length > 0}
        />
        <IconButton size="small" onClick={handleEditSave}>
          <CheckIcon htmlColor="green" />
        </IconButton>
        <IconButton size="small" onClick={handleEdit}>
          <CloseIcon htmlColor="red" />
        </IconButton>
      </Stack>
    </>
  ) : (
    <Box onClick={onOpen}>
      <Typography>
        {name.length > 40 ? name.slice(0, 40) + "..." : name}
      </Typography>
    </Box>
  );
};
