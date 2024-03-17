import styles from "./index.module.scss";
import { InputProps } from "./types";

export default function Input({
  register,
  rules,
  type,
  placeholder,
  id,
  label,
  icon,
  showPasswordIcon,
  handleChange,
  style,
}: InputProps) {
  return (
    <div className={styles.input}>
      {label && <label htmlFor={id}>{label}</label>}
      {icon}
      <input
        className={style}
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={128}
        onChange={handleChange}
        {...register && register(id, rules)}
      />
      {id === "password" && showPasswordIcon}
    </div>
  );
}
