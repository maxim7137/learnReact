import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import Layout from "../../components/Layout/Layout";
import { NamePath } from "antd/es/form/interface";
import { Link } from "react-router-dom";
import { Path } from "../../path";

const Login = () => {
  return (
    <Layout>
      <Row justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Space direction="vertical" size="large">
            <Form onFinish={() => null}>
              <Form.Item
                rules={[{ required: true, message: "Обязательное поле" }]}
                shouldUpdate={true}
              >
                <Input type="email" name="email" placeholder="почта" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Обязательное поле" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value.length < 3) {
                        return Promise.reject(
                          new Error("Пароль не может быть короче 3х символов")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                shouldUpdate={true}
              >
                <Input type="password" placeholder="пароль" />
              </Form.Item>
              <Button type="primary">Войти</Button>
            </Form>
            <Typography.Text>
              Нет аккаунта? <Link to={Path.register}>Зарегистрироваться</Link>{" "}
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
