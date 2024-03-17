import { useEffect, useState } from "react";
import generateAvatarColors from "../../helpers/generateAvatar";
import styles from "./index.module.scss";

import { IAvatarProps } from "./types";

export default function Avatar({ isOnline, avatar, user }: IAvatarProps) {
  const [color, setColor] = useState({r: 0, g: 0, b: 0})
  const initials = user.fullname.split(' ').map((char: string) => char[0]).join('').toUpperCase()

  useEffect(() => {
    setColor(generateAvatarColors(user._id))
  }, [user._id])

  return avatar ? (
    <div
      className={isOnline ? `${styles.avatar} ${styles.online}` : styles.avatar}
    >
      <img src={avatar} alt="avatar" />
    </div>
  ) : (
    <div
      className={isOnline ? `${styles.avatar} ${styles.online}` : styles.avatar}
      style={
        {backgroundColor: `rgb(${color.r} ${color.g} ${color.b})`}
      }
    >
      {initials}
    </div>
  );
}
