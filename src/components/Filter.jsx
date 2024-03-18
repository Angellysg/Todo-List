import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Filter = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="filter-label">Filters</InputLabel>
            <Select
                labelId="filter-label"
                id="filter"
                value={value}
                onChange={onChange}
                label="Filtrar"
            >
                <MenuItem value="todas">All</MenuItem>
                <MenuItem value="completas">Complete</MenuItem>
                <MenuItem value="incompletas">Incomplete</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Filter;
