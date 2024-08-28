import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './components/contact.jsx';
import Home from './components/Home.jsx';
import App from './App.jsx';
import ErrorPage from './ErrorPage.jsx';
import CountryDetail from './components/CountryDetail.jsx';
import ReactForm from './components/ReactForm.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/contact',
				element: <Contact />,
			},
			{
				path: '/:country',
				element: <CountryDetail />,
			},
			{
				path: '/form',
				element: <ReactForm />,
			},
		],
	},
]);

const root = createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={router} />);
