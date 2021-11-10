import { TextField } from "@material-ui/core";
import React from "react";

type InputFieldProps = {
  type: string;
  isRequired: boolean;
  label: string;
  name: string;
  handleChange: (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const InputField = (props: InputFieldProps) => {
  return (
    <TextField
      id="outlined-basic"
      label={props.label}
      variant="outlined"
      name={props.name}
      type={props.type}
      required={props.isRequired}
      onChange={(event) => props.handleChange(props.name, event)}
    />
  );
};

export default InputField;
