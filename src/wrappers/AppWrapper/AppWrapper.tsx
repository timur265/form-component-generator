import React from "react";
import "src/styles/global.css";

const AppWrapper = (props: { children: React.ReactNode }) => {
  return <>{props.children}</>;
};

export default AppWrapper;
