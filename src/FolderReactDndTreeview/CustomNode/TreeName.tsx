import React, { ChangeEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { IconButton, TextField } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { NodeModel } from "@minoru/react-dnd-treeview";

type TreeNameProps = {
  id: NodeModel["id"];
  text: string;
  enabledEdit: boolean;
  onEnabledEdit: (id: NodeModel["id"]) => void;
  onEdit: (id: NodeModel["id"], name: string) => void;
  
};

export const TreeName: React.FC<TreeNameProps> = (props) => {
  const { id, text, enabledEdit, onEnabledEdit, onEdit } = props;

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
    onEnabledEdit(id);
    onEdit(id, name);
  };
  const handelKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleEditSave();
    }
  };

  return enabledEdit ? (
    <>
      <TextField
      value={text}
      onChange={handleInput}
      onKeyDown={handelKeyPress}
      />
      <IconButton onClick={handleEditSave}>
      <CheckIcon htmlColor="green" />
      </IconButton>
      <IconButton onClick={handleEdit}>
      <CloseIcon htmlColor="red" />
      </IconButton>
    </>
  ) : (
    <Typography>
      {text.length > 40 ? text.slice(0, 40) + "..." : text}
    </Typography>
  );
};
