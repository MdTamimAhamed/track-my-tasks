import React from 'react';
import ReactLoading from 'react-loading';

type LoadingStyleType =
	| 'bubbles'
	| 'bars'
	| 'spinningBubbles'
	| 'spin'
	| 'balls'
	| 'cubes'
	| 'cylon'
	| 'spokes';

type SizeType = 'xs' | 'sm' | 'md' | 'lg';

const Loading: React.FC<{ type: LoadingStyleType; size: SizeType }> = ({
	type,
	size,
}) => {
	let loaderSize: number;
	switch (size) {
		case 'xs':
			loaderSize = 20;
			break;
		case 'sm':
			loaderSize = 40;
			break;
		case 'md':
			loaderSize = 60;
			break;
		case 'lg':
			loaderSize = 80;
			break;
		default:
			loaderSize = 40;
			break;
	}

	return (
		<>
			<ReactLoading
				className='flex justify-start items-center'
				type={type}
				height={loaderSize}
				width={loaderSize}
			/>
		</>
	);
};

export default Loading;
