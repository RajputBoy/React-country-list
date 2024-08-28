import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { ThemeContext } from '../contexts/ThemeContexts';
import './CountryDetail.css';
import CountryDetailShimmer from './CountryDetailShimmer';

export default function CountryDetail() {
	const [isDark] = useContext(ThemeContext);
	const params = useParams();
	const { state } = useLocation();

	const countryName = params.country;

	const [countryData, setCountryData] = useState(null);
	const [notFound, setNotFound] = useState(false);

	function updateCountryData(data) {
		setCountryData({
			name: data.name.common || data.name,
			nativeName: Object.values(data.name.nativeName || {})[0]?.common,
			population: data.population,
			region: data.region,
			subregion: data.subregion,
			capital: data.capital,
			flag: data.flags.svg,
			tld: data.tld,
			languages: Object.values(data.languages || {}).join(', '),
			currencies: Object.values(data.currencies || {})
				.map(currency => currency.name)
				.join(', '),
			borders: [],
		});

		if (!data.borders) {
			data.borders = [];
		}

		Promise.all(
			data.borders.map(border => {
				return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
					.then(res => res.json())
					.then(([borderCountry]) => borderCountry.name.common);
			}),
		).then(borders => {
			setTimeout(() => {
				setCountryData(prevState => ({ ...prevState, borders }));
			});
		});
	}

	useEffect(
		() => {
			if (state) {
				updateCountryData(state);
				return;
			}

			fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
				.then(res => res.json())
				.then(([data]) => {
					updateCountryData(data);
				})
				.catch(err => {
					setNotFound(true);
				});
		},
		[countryName],
	);

	if (notFound) {
		return <div>Country Not found</div>;
	}

	return countryData === null ? (
		'loading...'
	) : (
		<main className={`${isDark ? 'dark' : ''}`}>
			<div className="country-details-container">
				<Link to={`/`}>
					<span className="back-button">
						<i className="fa-solid fa-arrow-left" />&nbsp; Back
					</span>
				</Link>
				<Link to={'/form'} style={{ float: 'right' }}>
					<span>Add</span>
				</Link>

				{countryData === null ? (
					<CountryDetailShimmer />
				) : (
					<div className="country-details">
						<img src={countryData.flag} alt={`${countryData.name} flag`} />
						<div className="details-text-container">
							<h1>{countryData.name}</h1>
							<div className="details-text">
								<p>
									<b>Native Name: {countryData.nativeName || countryData.name} </b>
									<span className="native-name" />
								</p>
								<p>
									<b>Population: {countryData.population.toLocaleString('en-IN')}</b>
									<span className="population" />
								</p>
								<p>
									<b>Region: {countryData.region}</b>
									<span className="region" />
								</p>
								<p>
									<b>Sub Region: {countryData.subregion}</b>
									<span className="sub-region" />
								</p>
								<p>
									<b>Capital: {countryData.capital?.join(', ')}</b>
									<span className="capital" />
								</p>
								<p>
									<b>Top Level Domain: {countryData.tld}</b>
									<span className="top-level-domain" />
								</p>
								<p>
									<b>Currencies: {countryData.currencies}</b>
									<span className="currencies" />
								</p>
								<p>
									<b>Languages: {countryData.languages}</b>
									<span className="languages" />
								</p>
							</div>
							<div className="border-countries">
								<b>Border Countries: </b>&nbsp;
								{countryData && countryData.borders && countryData.borders.length > 0 ? (
									countryData.borders.map(border => (
										<Link key={border} to={`/${border}`}>
											{border}
										</Link>
									))
								) : (
									<p>No borders available</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
