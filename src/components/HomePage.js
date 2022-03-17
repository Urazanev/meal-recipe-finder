import React, { useState } from "react";
import { SearchForm } from "./SearchForm";
import { MealCard } from "./MealCard";
import { useMeals } from "../hooks";

function HomePage() {
  const [query, setQuery] = useState();
  const [mealsIsLoading, searchResults] = useMeals(query);
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchPhrase);
    setSearchPhrase("");
  };
  const searchStatusTitle = mealsIsLoading
    ? "searching..."
    : searchResults.length > 0
    ? `Search results for ${query}:`
    : "There are no search results. Try again!";

  return (
    <div className="container">
      <SearchForm
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        handleSubmit={handleSubmit}
      />
      {query && <h2 data-testid="search-status">{searchStatusTitle}</h2>}
      {searchResults.length > 0 && (
        <div className="meals" data-testid="meals">
          {searchResults.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
