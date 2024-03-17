import { ChangeEvent, ReactElement, ReactNode } from "react";

interface IRulesOptions {
  required?:
    | {
        value: boolean;
        message: string;
      }
    | boolean;
  maxLength?:
    | {
        value: number;
        message: string;
      }
    | number;
  pattern?:
    | {
        value: RegExp;
        message: string;
      }
    | RegExp;
}

export interface InputProps {
  register?: (name: string, rules?: IRulesOptions) => object;
  rules?: IRulesOptions;
  type: string;
  placeholder: string;
  id: string;
  label?: string;
  icon?: ReactNode;
  showPasswordIcon?: ReactElement;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: string;
}
