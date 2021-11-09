import React from "react";
import classes from "./Typography.css";
import cn from "clsx";

type TypographyProps = {
  variant: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "li" | "span" | "label";
  children: React.ReactChild | string[];
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  fontWeight?: string;
};

const Typography = (props: TypographyProps) => {
  const { variant, children, style } = props;
  const Component = variant;

  const getClassName = (): string => {
    const { color, variant, className } = props;
    return cn({
      [classes.common]: true,
      [classes.p]: variant === "p",
      [classes.h1]: variant === "h1",
      [classes.h2]: variant === "h2",
      [classes.h3]: variant === "h3",
      [classes.h4]: variant === "h4",
      [classes.h5]: variant === "h5",
      [classes.li]: variant === "li",
      [classes.label]: variant === "label",
      [classes.span]: variant === "span",
      [classes.white]: color == "white",
      [classes.black]: color == "black",
      [classes.navbarLink]: className == "navbarLink",
    });
  };

  return (
    <Component style={style} className={getClassName()}>
      {children}
    </Component>
  );
};

export default Typography;
