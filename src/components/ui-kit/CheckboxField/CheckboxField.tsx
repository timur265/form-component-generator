import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";

type CheckboxFieldProps = {
  label: string;
  isChecked: boolean;
  type: string;
  value: string | null;
  name: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  isRequired: boolean;
};

const CheckboxField = (props: CheckboxFieldProps) => {
  const [checked, setChecked] = useState(props.isChecked);

  const setCheckedValue = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          value={props.value == null ? false : props.value}
          name={props.name}
          onChange={(event) => {
            props.handleChange(event, props.type);
            setCheckedValue();
          }}
          required={props.isRequired}
        />
      }
      label={props.label}
    />
  );
};

export default CheckboxField;
