import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
// let navigate = useNavigate();
// const dispatch = useDispatch();
import { registerService } from "../../api/userService";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};
let handleRegister = (user, onSuccess) => {
  console.log("user want register", user);
  registerService(user)
    .then((res) => {
      console.log("register success", res);
      toast.success("Đăng kí tài khoản thành công");
      //   const userJson = JSON.stringify(user);
      //   localStorage.setItem("userRegister", userJson);
      // thành công thì chuyển về trang đăng nhập
      if (onSuccess) onSuccess();
    })
    .catch((err) => {
      console.log("register failed", err);
      toast.error("Đăng kí thất bại, tài khoản đã tồn tại");
    });
};
const RegisterForm = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleRegister(values, onSuccess);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ maNhom: "GP11" }}
      style={{ maxWidth: 1000 }}
      scrollToFirstError
    >
      <Form.Item
        name="taiKhoan"
        label="Tài khoản Facebook/tiktok "
        rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="matKhau"
        label="Mật khẩu"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={["matKhau"]}
        hasFeedback
        rules={[
          { required: true, message: "Vui lòng xác nhận mật khẩu!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("matKhau") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "Email không hợp lệ!",
          },
          {
            required: true,
            message: "Vui lòng nhập email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="soDt"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="maNhom"
        label="Mã nhóm"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã nhóm!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="maLoaiNguoiDung" initialValue="KhachHang" hidden>
        <Input />
      </Form.Item>

      <Form.Item
        name="hoTen"
        label="Họ tên"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ tên!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Bạn phải đồng ý với điều khoản")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Xem trước trang
          <a href="http://localhost:5173/">MovieHome</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
