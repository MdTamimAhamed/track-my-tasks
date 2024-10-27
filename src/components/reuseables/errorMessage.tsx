import React from 'react';

interface ErrorMessageProps {
	errorObj: { [field: string]: string };
	checkField: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	errorObj,
	checkField,
}) => {
	return (
		<div>
			<p className='text-xs font-light text-red-500'>
				{errorObj?.[checkField]}
			</p>
		</div>
	);
};

export default ErrorMessage;
