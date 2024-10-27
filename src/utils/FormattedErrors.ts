export interface FormattedErrors {
	[field: string]: string;
}

export const formattedErrors = (error: any) => {
	const errors: FormattedErrors = {};
	error.errors.forEach((err: any) => {
		const field = err.path;
		errors[field] = err.message;
	});
	return errors;
};
