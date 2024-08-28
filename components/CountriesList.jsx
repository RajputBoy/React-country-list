import React, { useEffect, useState } from 'react';
import CountryCard from './CountryCard';
import CountriesListSimmer from './CountriesListSimmer';

export default function CountriesList({ query }) {
	const [countriesData, setCountriesData] = useState([]);
	var url = 'https://restcountries.com/v3.1/all';
	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(data => setCountriesData(data));
	}, [] );
	return (
		<>
			{ !countriesData.length ? (<CountriesListSimmer />) :
			(<div className="countries-container">

				{countriesData.filter(country => country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)).map(country => {
					return (
						<CountryCard
							key={country.name.common}
							name={country.name.common}
							flag={country.flags.svg}
							population={country.population}
							region={country.region}
							capital={country.capital?.[0]}
							data = {country}
						/>
					);
				})}
				</div >
				)
			}
		</>
	);
};
