import React, { useState, useEffect, createRef, useRef } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { LockOutlined, MailFilled } from '@ant-design/icons';
import { useAuthDispatch, useAuthState } from './authContext';
import { useLoginMutation, useVerifyOtpMutation } from './graphql/client';

export function AuthenticationModal() {
  const otpRef = useRef<Input | null>(null);

  const [form] = Form.useForm();

  const [isOTPVisible, setIsOTPVisible] = useState(false);

  const dispatch = useAuthDispatch();
  const { authState } = useAuthState();

  const [loginResult, loginMutation] = useLoginMutation();
  const login = loginResult.data?.login;

  const [otpVerifyResult, verifyOtpMutation] = useVerifyOtpMutation();
  const verifyOtp = otpVerifyResult.data?.verifyOtp;

  useEffect(() => {
    if (authState === 'AUTHENTICATED') {
      setIsOTPVisible(false);
      form.resetFields();
    }
  }, [authState, form]);

  useEffect(() => {
    if (verifyOtp) {
      localStorage.setItem('access_token', verifyOtp.accessToken);
      dispatch({ type: 'AUTH_STATE_CHANGED', payload: 'AUTHENTICATED' });
    }
  }, [verifyOtp, dispatch, form]);

  useEffect(() => {
    if (login) {
      setIsOTPVisible(true);
    }
  }, [login, otpRef]);

  useEffect(() => {
    if (isOTPVisible) {
      otpRef.current?.focus();
    }
  }, [isOTPVisible]);

  const onFinish = async (values: { email: string; otp: string }) => {
    if (values.email && !values.otp) {
      return loginMutation({ email: values.email });
    }

    if (values.otp) {
      return verifyOtpMutation({ token: values.otp });
    }
  };

  return (
    <Modal
      title="Authentication needed"
      visible={authState === 'UNAUTHENTICATED'}
      footer={null}
      closable={false}
    >
      <Form form={form} name="authentication" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter valid email!' },
          ]}
        >
          <Input autoFocus prefix={<MailFilled />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          style={{ display: isOTPVisible ? 'block' : 'none' }}
          name="otp"
          help={otpVerifyResult.error?.message.replace('[GraphQL] ', '')}
          validateStatus={otpVerifyResult.error?.message ? 'error' : undefined}
          rules={[
            {
              required: isOTPVisible,
              message: 'Please input your OTP!',
            },
          ]}
        >
          <Input
            ref={otpRef}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="otp"
            placeholder="One Time Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loginResult.fetching}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AuthenticationModal;
