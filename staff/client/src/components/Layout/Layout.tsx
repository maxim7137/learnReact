import { Layout as AntLayout } from "antd";
import Header from "../Header/Header";

import styles from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <main className={styles.main}>
      <Header />
      <AntLayout.Content>{children}</AntLayout.Content>
    </main>
  );
}

export default Layout;
