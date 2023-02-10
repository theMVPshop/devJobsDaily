import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(`https://api.example.com/search?q=${query}`);

    setResults(response.data.results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </form>
  );
};

export default SearchForm;
