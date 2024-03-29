import { ReactElement } from "react";
import { IAuthLayoutProps } from "./types";
import banner from "../../assets/img/Banner.jpg";

import styles from "./index.module.scss";

export default function AuthLayout({
  children,
  needBanner = true
}: IAuthLayoutProps): ReactElement {
  return (
    <main className={styles.auth}>
      <section className={styles.wrapper}>
        <div className={styles.inner}>
          {children}
          {needBanner && <img className={styles.banner} src={banner} alt="Banner" />}
        </div>
      </section>
    </main>
  );
}
