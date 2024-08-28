import React from 'react';
import './ListSimmer.css';

export default function CountriesListSimmer() {
	return (
		<div className="countries-container">
			{Array.from({ length: 10 }).map((el, i) => {
				return <div key={i} className="country-card simmer-effect" />;
			})}
		</div>
	);
}
