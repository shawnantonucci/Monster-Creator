import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const RegisterForm = ({ setLoginOrSignup, loginOrSignup }: any) => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      Register
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
          Or <p onClick={() => setLoginOrSignup(!loginOrSignup)}>login now!</p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
