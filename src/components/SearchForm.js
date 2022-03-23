import React from 'react'

export const SearchForm = ({ handleSubmit, setSearchPhrase, searchPhrase }) => {
  return (
      <form className="flex" onSubmit={handleSubmit}>
        <input
            data-testid="input"
            type="text"
            value={searchPhrase}
            placeholder="Search for meals or keywords"
            onChange={event => setSearchPhrase(event.target.value)}
        />
        <button className="search-btn" type="submit" data-testid="search-btn">
          <i className="fas fa-search"/>
        </button>
      </form>
  )
}
