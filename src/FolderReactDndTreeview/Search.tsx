import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type SearchProps = {
  onSearch: (search: string) => void;
  onClear: () => void;
};

function Search({ onSearch, onClear }: SearchProps) {
  const [search, setSearch] = useState("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    if (search.length === 0) {
      onClear();
    } else {
      onSearch(search);
    }
  };
  const handelKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleClear = () => {
    setSearch("");
    onClear();
  };

  return (
    <>
      <TextField
        value={search}
        onChange={handleInput}
        onKeyDown={handelKeyPress}
      />
      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={handleClear}>Clear</Button>
    </>
  );
}

export default Search;
