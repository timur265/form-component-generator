import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState } from "react";

type RadioFieldProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  handleChange: (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isRequired: boolean;
};

const RadioField = (props: RadioFieldProps) => {
  const [chosenValue, setChosenValue] = useState(props.options[0].value);

  const handleChangeChosenRadio = (value: string) => {
    setChosenValue(value);
  };

  const getRadio = () => {
    return props.options.map(
      (option: { label: string; value: string }, index: number) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Radio
                required={props.isRequired}
                checked={chosenValue === option.value.toString()}
                name={props.name}
                value={option.value}
                onChange={(event) => {
                  props.handleChange(props.name, event),
                    handleChangeChosenRadio(event.target.value);
                }}
              />
            }
            label={option.label}
          />
        );
      }
    );
  };

  return (
    <>
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup>{getRadio()}</RadioGroup>
    </>
  );
};
export default RadioField;
