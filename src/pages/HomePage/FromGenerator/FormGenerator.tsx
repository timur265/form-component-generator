import Button from "@material-ui/core/Button";
import React, { Dispatch, SetStateAction, useState } from "react";
import CheckboxField from "src/components/ui-kit/CheckboxField";
import InputField from "src/components/ui-kit/InputField";
import RadioField from "src/components/ui-kit/RadioField/RadioField";
import SelectField from "src/components/ui-kit/SelectField";
import { v4 as uuidv4 } from "uuid";
import classes from "./FormGenerator.css";
import cn from "clsx";

type FormGeneratorProps = {
  formConfigValues: [];
  setSubmitedData: Dispatch<SetStateAction<never[]>>;
  handleClick: () => void;
};

const FormGenerator = ({
  formConfigValues,
  setSubmitedData,
  handleClick,
}: FormGeneratorProps) => {
  const [elements, setElements] = useState<any>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setSubmitedData(elements);
    setTimeout(() => handleClick(), 500);
  };

  const handleTextInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newElements = elements;
    newElements[name] = event.target.value;

    setElements(newElements);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const isChecked = event.target.checked;
    const name = event.target.name;
    const value = event.target.value;
    const newElements = elements;

    if (newElements !== undefined) {
      if (type === "checkbox_single") {
        if (isChecked) {
          newElements[name] = value;
        } else {
          delete newElements[name];
        }
      }

      if (type === "checkbox_multiple") {
        if (!newElements[name]) {
          newElements[name] = [];
        }

        if (isChecked) {
          newElements[name].push(value);
        } else {
          const index = newElements[name].indexOf(value);
          newElements[name].splice(index, 1);
        }
      }
      setElements(newElements);
    }
  };

  const handleRadioInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newElements = elements;
    newElements[name] = event.target.value;

    setElements(newElements);
  };

  const handleSelectChange = (name: string, value: string) => {
    const newElements = elements;
    newElements[name] = value;

    setElements(newElements);
  };

  const getFormComponents = () => {
    return formConfigValues.map((formConfigValue: any, index: number) => {
      const name = formConfigValue.name ? formConfigValue : uuidv4();
      switch (formConfigValue.type) {
        case "text" || "number" || "email":
          return (
            <div key={index}>
              <InputField
                key={index}
                name={name}
                type={formConfigValue.type}
                isRequired={formConfigValue.required}
                label={formConfigValue.label}
                handleChange={handleTextInputChange}
              />
            </div>
          );
        case "checkbox_single":
          return (
            <div key={index}>
              <CheckboxField
                isRequired={formConfigValue.required}
                name={name}
                type={formConfigValue.type}
                value={formConfigValue.value}
                isChecked={false}
                label={formConfigValue.label}
                handleChange={handleCheckboxChange}
              />
            </div>
          );
        case "checkbox_multiple":
          return (
            <div key={index}>
              {formConfigValue.options.map(
                (option: { label: string; value: string }, index: number) => {
                  return (
                    <CheckboxField
                      key={index}
                      isRequired={formConfigValue.required}
                      type={formConfigValue.type}
                      name={name}
                      value={option.value}
                      isChecked={false}
                      label={option.label}
                      handleChange={handleCheckboxChange}
                    />
                  );
                }
              )}
            </div>
          );
        case "radio":
          return (
            <div key={index}>
              <RadioField
                key={index}
                isRequired={formConfigValue.required}
                name={name}
                label={formConfigValue.label}
                options={formConfigValue.options}
                handleChange={handleRadioInputChange}
              />
            </div>
          );
        case "select":
          return (
            <div key={index}>
              <SelectField
                isRequired={formConfigValue.required}
                key={index}
                name={name}
                label={formConfigValue.label}
                options={formConfigValue.options}
                handleChange={handleSelectChange}
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn(classes.form)}>
      {getFormComponents()}
      <Button className={cn(classes.btn)} variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default FormGenerator;
