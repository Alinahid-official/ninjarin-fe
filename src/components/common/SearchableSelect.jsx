import React, { useEffect, useState } from "react";
import { Select, Button, Flex } from "antd";
import axios from "axios";
import { API_BASE } from "@/config/config";

const SearchableSelect = ({
  url = "admin-inventories",
  value,
  onChange,
  placeholder = "Search or Add New",
  width = "100%",
  addNewText = "Add New",
  notFoundMessage = "Couldn't find the item?",
  type,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);

  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);
      const res = await axios.get(
        `${API_BASE}/${url}?type=${type}&search=${term}`
      );
      console.log(res.data);
      setOptions(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddNew = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API_BASE}/${url}`, {
        name: searchTerm,
        type: type,
      });
      console.log(res.data);
      setOptions([...options, res.data]);
    } catch (err) {
      console.log(err);
    }
    // Add logic to handle adding a new item
  };
  const customNotFoundContent = (
    <Flex align="center" style={{ padding: 16 }}>
      <div>{notFoundMessage}</div>
      <Button type="link" onClick={handleAddNew}>
        {addNewText}
      </Button>
    </Flex>
  );

  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <Select
      value={value}
      onChange={onChange}
      onSearch={handleSearch}
      placeholder={placeholder}
      style={{ width }}
      showSearch
      notFoundContent={customNotFoundContent}
      size="large"
    >
      {options.map((option) => (
        <Select.Option key={option._id} value={option.name}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SearchableSelect;
