import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContexts';

const App = () => {
	return (
		<div>
			<ThemeProvider>
				<Header />
				<Outlet />
			</ThemeProvider>
		</div>
	);
};

export default App;
