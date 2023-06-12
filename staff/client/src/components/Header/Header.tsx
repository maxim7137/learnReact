import { Layout, Space, Typography, Button } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { Path } from "../../path";

function Header() {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Path.home}>
          <Button type="primary">Сотрудники</Button>
        </Link>
      </Space>
      <Space>
        <Link to={Path.register}>
          <Button type="primary">Зарегистрироваться</Button>
        </Link>
        <Link to={Path.login}>
          <Button type="primary">Войти</Button>
        </Link>
      </Space>
    </Layout.Header>
  );
}

export default Header;
