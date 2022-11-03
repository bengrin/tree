import React, { ChangeEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Stack, TextField } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { NodeModel } from "@minoru/react-dnd-treeview";

type TreeNameProps = {
  id: NodeModel["id"];
  text: string;
  enabledEdit: boolean;
  onEnabledEdit: (id: NodeModel["id"]) => void;
  onEdit: (id: NodeModel["id"], name: string) => void;
  onOpen: (e: React.MouseEvent) => void;
};

export const TreeName: React.FC<TreeNameProps> = (props) => {
  const { id, text, enabledEdit, onEnabledEdit, onEdit, onOpen } = props;

  const [name, setName] = useState("");
  useEffect(() => {
    setName(text);
  }, [text, enabledEdit]);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEdit = () => {
    onEnabledEdit(id);
  };
  const handleEditSave = () => {
    onEdit(id, name);
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
          value={name}
          onChange={handleInput}
          onKeyDown={handelKeyPress}
        />
        <IconButton onClick={handleEditSave}>
          <CheckIcon htmlColor="green" />
        </IconButton>
        <IconButton onClick={handleEdit}>
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
