import React, { useRef, useState } from "react";
import Layout from "src/components/Layout";
import classes from "./HomePage.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import FormGenerator from "./FromGenerator";
import { Box, Modal } from "@material-ui/core";

const HomePage = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [formConfigValues, setFormConfigValues] = useState<[]>([]);
  const [submitedData, setSubmitedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const setValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileReader = new FileReader();

    if (e.target.files != null) {
      const ext = e.target.files[0].name.split(".").pop();
      if (ext === "json") {
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
          if (e.target != null && typeof e.target.result == "string") {
            const result = JSON.parse(e.target.result);
            setFormConfigValues(result);
          }
        };
      }
    }
  };

  const getSubmitData = () => {
    return JSON.stringify(Object.assign({}, submitedData), null, 2);
  };

  return (
    <Layout>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        className={cn(classes.modal)}
      >
        <Box className={cn(classes.box)}>{getSubmitData()}</Box>
      </Modal>
      <div>
        <form>
          <input
            className={cn(classes.inputFile)}
            type="file"
            onChange={setValue}
            ref={fileInput}
          />
        </form>

        <button
          className={cn(classes.uploadBtn)}
          onClick={() => {
            fileInput && fileInput.current ? fileInput.current.click() : null;
          }}
        >
          <Typography variant="span" color="white">
            Pick File
          </Typography>
        </button>
      </div>
      {formConfigValues.length != 0 ? (
        <FormGenerator
          handleClick={handleClick}
          setSubmitedData={setSubmitedData}
          formConfigValues={formConfigValues}
        />
      ) : null}
      <div>{submitedData.length != 0 ? submitedData : null}</div>
    </Layout>
  );
};

export default HomePage;
