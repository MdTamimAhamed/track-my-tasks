'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Loading from '../reuseables/Loading';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ErrorMessage from '../reuseables/errorMessage';

interface User {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface FormattedErrors {
	[field: string]: string;
}

const SignupForm: React.FC = () => {
	const router = useRouter();
	const [user, setUser] = useState<User>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<FormattedErrors>({});

	const onSignupHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post('/api/auth/signup', user);
			if (response.status === 200) {
				toast.success(response.data.message);
				setUser({ username: '', email: '', password: '', confirmPassword: '' });
			} else {
				toast.error('Signup failed!');
			}
		} catch (error: any) {
			console.log(error);
			setErrorMessage(error.response?.data?.errors);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-96 p-3 border-1 rounded-md '>
			<h1 className='mb-3'>Signup</h1>
			<form onSubmit={onSignupHandler} className=' flex flex-col gap-3'>
				<Input
					value={user.username}
					onChange={(e) => setUser({ ...user, username: e.target.value })}
					type='text'
					placeholder='Username'
					required
				/>
				<ErrorMessage errorObj={errorMessage} checkField={'username'} />
				<Input
					value={user.email}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
					type='email'
					placeholder='Email'
					required
					autoComplete='nope'
				/>
				<ErrorMessage errorObj={errorMessage} checkField={'email'} />
				<Input
					value={user.password}
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					type='password'
					placeholder='Password'
					required
				/>
				<ErrorMessage errorObj={errorMessage} checkField={'password'} />
				<Input
					value={user.confirmPassword}
					onChange={(e) =>
						setUser({ ...user, confirmPassword: e.target.value })
					}
					type='password'
					placeholder='Confirm password'
					required
				/>
				<ErrorMessage errorObj={errorMessage} checkField={'confirmPassword'} />
				<Button type='submit' className='font-medium' variant='secondary'>
					Signup
					{loading && <Loading type='spin' size='sm' />}
				</Button>
			</form>
		</div>
	);
};

export default SignupForm;
