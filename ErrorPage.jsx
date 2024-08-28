import React from 'react';
import Header from './components/Header';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	return (
		<div>
			<Header />
			<div>Something went wrong {error.status} !!</div>
		</div>
	);
};

export default ErrorPage;
