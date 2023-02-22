import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      experience: 'entryLevel',
      remote: true,
      location: '',
    };
  }

  handleTermChange = (event) => {
    this.setState({ term: event.target.value });
  };

  handleExperienceChange = (event) => {
    this.setState({ experience: event.target.value });
  };

  handleRemoteChange = (event) => {
    this.setState({ remote: JSON.parse(event.target.value) });
  };

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search Term:', this.state.term);
    console.log('Experience:', this.state.experience);
    console.log('Remote:', this.state.remote);
    console.log('Location:', this.state.location);
  };

  render() {
    return (
      <form className='searchBar' onSubmit={this.handleSubmit}>
        <label>
          Search Term:
          <input type="text" value={this.state.term} onChange={this.handleTermChange} />
        </label>
        <label>
          Experience: 
          <select value={this.state.experience} onChange={this.handleExperienceChange}>
            <option value="entryLevel">Entry Level</option>
            <option value="midLevel">Intermediate Level</option>
            <option value="seniorLevel">Senior Level</option>
          </select>
        </label>
        <label>
          Remote:
          <select value={this.state.remote} onChange={this.handleRemoteChange}>
            <option value={true}>Remote</option>
            <option value={false}>Not remote</option>
          </select>
        </label>
        <label>
          Location:
          <input type="text" value={this.state.location} onChange={this.handleLocationChange} />
        </label>
        <button type="submit">Post</button>
      </form>
    );
  }
}

export default SearchBar;