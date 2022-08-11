import React from 'react'
import { Button, Input, Form, Checkbox } from 'antd'
import styles from './login.module.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/userReducer';
import { useEffect } from 'react';

const Login = ({ setUser, setErrorMessage }) => {
	const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
	}
	const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
	}

	const dispatch = useDispatch()
	

	const onFinish = async (values) => {
	try {
		dispatch(login(values))

	} catch (exception) {
		setErrorMessage('Wrong credentials')
		setTimeout(() => {
		setErrorMessage(null)
		}, 5000)
	}
	}

	const onFinishFailed = (errorInfo) => {
	console.log('Failed:', errorInfo)
	}

	return (
	<div className={styles.loginModal}>
		<Form
		{...layout}
		name='normal_login'
		className='login-form'
		initialValues={{ remember: true }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
		>
		<Form.Item
			label='Username'
			name='username'
			rules={[{ required: true, message: 'Please input your username!' }]}
		>
			<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
		</Form.Item>

		<Form.Item
			label='Password'
			name='password'
			rules={[{ required: true, message: 'Please input your password!' }]}
		>
			<Input prefix={<LockOutlined className="site-form-item-icon" />}
			type="password"
			placeholder="Password" />
		</Form.Item>

		<Form.Item {...tailLayout} name='remember' valuePropName='checked' noStyle>
			<Checkbox>Remember me</Checkbox>
		</Form.Item>

		<Form.Item {...tailLayout}>
			<Button type='primary' htmlType='submit'>
			Log in
			</Button>
		</Form.Item>
		</Form>
	</div>
	)
}

export default Login
