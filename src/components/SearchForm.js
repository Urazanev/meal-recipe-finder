import React, { useState } from 'react'

export const useMeals = () => {
  const [data, setData] = useState(1)
  const updateData = (val) => {
    setData(val)
  }

  return [data, updateData]
}
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
