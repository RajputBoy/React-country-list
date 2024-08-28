import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContexts';
import { NavLink } from 'react-router-dom';

export default function Header() {
	const [isDark, setIsDark] = useContext(ThemeContext);

	return (
		<header className={`header-container ${isDark ? 'dark' : ''}`}>
			<div className="header-content">
				<h2 className="title">
					<a href="/">Where in the world !</a>
				</h2>
				<u className="menu-list">
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/contact">Contact</NavLink>{' '}
					</li>
				</u>
				<p
					className=""
					onClick={() => {
						setIsDark(!isDark);
						localStorage.setItem('isDarkMode', !isDark);
					}}
				>
					<i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`} />
					{isDark ? 'Dark' : 'Light'} mode
				</p>
			</div>
		</header>
	);
}
