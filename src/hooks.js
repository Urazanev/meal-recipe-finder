import { useEffect, useState } from 'react'

const MAX_MEAL_INGREDIENTS = 20

const mapIngredients = (data) => {
  const meal = data.meals[0]
  const ingredients = []
  if (meal) {
    for (let i = 1; i <= MAX_MEAL_INGREDIENTS; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
      } else {
        break
      }
    }
  }
  meal.ingredients = ingredients
  return meal
}

export const useMeal = (mealId) => {
  const [selectedMeal, setSelectedMeal] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fetchMeal () {
      try {
        setLoading(true)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
          .then(res => res.json())
          .then((data) => {
            const meal = mapIngredients(data)
            setSelectedMeal(meal)
          })
      } finally {
        setLoading(false)
      }
    }
    if (mealId) {
      fetchMeal()
    }
  }, [mealId])
  return [loading, selectedMeal]
}

export const useMeals = (searchPhrase) => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchMeals () {
      try {
        setLoading(true)
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchPhrase}`)
          .then(res => res.json())
          .then(data => setSearchResults(data.meals ?? []))
      } finally {
        setLoading(false)
      }
    }
    if (searchPhrase?.trim()) {
      fetchMeals()
    }
  }, [searchPhrase])
  return [loading, searchResults]
}
