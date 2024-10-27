import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/database';
import { hashPassword } from '@/lib/hashPass';
import { z } from 'zod';
import { formattedErrors } from '@/utils/FormattedErrors';

const userSchema = z
	.object({
		username: z.string().min(1, { message: 'Username is required!' }),
		email: z
			.string()
			.email({ message: 'Invalid email.' })
			.min(1, { message: 'Email is required!' }),
		password: z
			.string()
			.min(6, { message: 'Password must be 6 characters long.' })
			.min(1, { message: 'Password is required!' }),
		confirmPassword: z
			.string()
			.min(1, { message: 'Please confirm your password!' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password did not match!',
		path: ['confirmPassword'],
	});

export default async function Signup(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const parseBody = userSchema.parse(req.body);
		const { username, email, password } = parseBody;
		const hashedPassword = await hashPassword(password);

		const isUser = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);

		if (isUser && isUser.rows.length > 0) {
			return res.status(400).json({ message: 'User already exists!' });
		}

		//creating new user
		const query =
			'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
		const values = [username, email, hashedPassword];
		await pool.query(query, values);

		res.status(200).json({ message: 'Signup successfull!' });
	} catch (error) {
		let Errors;
		if (error instanceof z.ZodError) {
			Errors = formattedErrors(error);
		}
		return res.status(400).json({ errors: Errors });
	}
	res.status(500).json({ message: 'Internal server error!' });
}
