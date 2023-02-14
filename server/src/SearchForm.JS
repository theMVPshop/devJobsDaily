import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState('');
  const [experience, setExperience] = useState('');
  const [last24H, setLast24H] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(`http://localhost:3000/jobData?searchTerm=${searchTerm}&location=${location}&remote=${remote}&experience=${experience}&last24H=${last24H}`);

    setResults(response.data.response.results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter remote"
        value={remote}
        onChange={(event) => setRemote(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter experience"
        value={experience}
        onChange={(event) => setExperience(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter last24H"
        value={last24H}
        onChange={(event) => setLast24H(event.target.value)}
      />
      <button type="submit">Search</button>
      {results.map((result) => (
        <div key={result.id}>{result.jobValue} jobs found</div>
      ))}
    </form>
  );
};

export default SearchForm;
