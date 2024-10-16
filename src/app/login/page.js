'use client'; // karena form ini menggunakan komponen client-side

import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation'; // untuk navigasi setelah login
import "./loginPage.css";

const Login = () => {
  const router = useRouter();

  const onFinish = (values) => {
    console.log('Success:', values); // Menampilkan hasil input di console
    router.push('/main'); // Redirect ke halaman utama setelah login
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }} // Mengatur tinggi minimum ke 100% viewport
    >
        
      <div
        className="card"
        style={{
          width: '400px',
          color: '#171717', // Warna teks
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Menambahkan bayangan pada card
        }}
      >
        <h2 className="text-center">Login Form</h2>
        <Form
          name="basic"
          labelCol={{ span: 24 }} // Mengatur label menjadi satu kolom penuh
          wrapperCol={{ span: 24 }} // Mengatur input menjadi satu kolom penuh
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input className="form-control" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              className="form-control"
              style={{ width: '100%' }} // Pastikan lebar penuh
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}> {/* Mengatur tombol menjadi satu kolom penuh */}
            <Button type="primary" htmlType="submit" className="btn btn-primary w-100">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
