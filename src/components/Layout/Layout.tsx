import classes from "./Layout.css";
import cn from "clsx";
import React from "react";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <main className={cn(classes.container)}>{props.children}</main>
    </>
  );
};

export default Layout;
