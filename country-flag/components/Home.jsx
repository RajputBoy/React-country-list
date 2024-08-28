import { useContext, useState } from 'react';
import CountriesList from './CountriesList';
import SearchBar from './SearchBar';
import Filter from '../Filter';
import { ThemeContext } from '../contexts/ThemeContexts';

export default function Home() {
	const [query, setQuery] = useState('');
	const [isDark] = useContext(ThemeContext);
	return (
		<div>
			<main className={`${isDark ? 'dark' : ''}`}>
				<div className="search-filter-container" />
				<SearchBar setQuery={setQuery} />
				<Filter setQuery={setQuery} />
				<CountriesList query={query} />
			</main>
		</div>
	);
}
