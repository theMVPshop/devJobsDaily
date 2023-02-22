import React from 'react';

const SavedSearchList = ({ savedSearches, handleEditSearch, handleRemoveSearch }) => {
  return (
    <ul className='saved-search-list'>
      {savedSearches.map((search, index) => (
        <li key={index}>
          Search Term: {search.searchTerm}, Location: {search.location}, Remote: {search.remote ? 'Yes' : 'No'}, Experience: {search.experience}
          <button onClick={() => handleEditSearch(index)}>Edit</button>
          <button onClick={() => handleRemoveSearch(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default SavedSearchList;
