import { ReactElement } from "react";
import "./index.module.scss";
import { IButtonProps } from "./types";

export default function Button({
  type,
  title,
  ...props
}: IButtonProps): ReactElement {
  return (
    <button {...props} type={type}>
      {title}
    </button>
  );
}
