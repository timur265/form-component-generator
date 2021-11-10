import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";

type SelectFieldProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  handleChange: (name: string, value: string) => void;
  isRequired: boolean;
};

const RadioField = (props: SelectFieldProps) => {
  const [chosenValue, setChosenValue] = useState(props.options[0].value);

  useEffect(() => {
    props.handleChange(props.name as string, chosenValue);
  }, []);

  const setChosenItem = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setChosenValue(event.target.value as string);
  };

  const getItems = () => {
    return props.options.map(
      (option: { label: string; value: string }, index: number) => {
        return (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        );
      }
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        required={props.isRequired}
        name={props.name}
        value={chosenValue}
        label={props.label}
        onChange={(event) => {
          props.handleChange(
            event.target.name as string,
            event.target.value as string
          ),
            setChosenItem(event);
        }}
      >
        {getItems()}
      </Select>
    </FormControl>
  );
};
export default RadioField;
