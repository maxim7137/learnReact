import React from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Path } from "../../path";
const Register = () => {
  return (
    <Layout>
      <Row justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
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
                <Input type="password" name="password" placeholder="пароль" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Обязательное поле" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value !== getFieldValue("password")) {
                        return Promise.reject(
                          new Error("Пароли должны совпадать")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                shouldUpdate={true}
              >
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Повторите пароль"
                />
              </Form.Item>
              <Button type="primary">Зарегистрироваться</Button>
            </Form>
            <Typography.Text>
              Нет аккаунта? <Link to={Path.login}>Войти</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
