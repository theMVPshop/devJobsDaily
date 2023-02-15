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
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Term"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
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
       <div className="remoteContainer">
      <label>Remote:</label>
      <input
        type="checkbox"
        checked={remote}
        onChange={(event) => setRemote(event.target.checked)}
      />
      </div>
      <button type="submit">Search</button>
      {results.map((result) => (
        <div key={result.id}>{result.jobValue} jobs found</div>
      ))}
    </form>
  );
};

export default SearchForm;
