import React from 'react'
import { useParams } from 'react-router-dom'
import { useMeal } from '../hooks'

const SingleMealPage = () => {
  const { mealId } = useParams()
  const [mealIsLoading, meal] = useMeal(mealId)
  return mealIsLoading || !meal
    ? (<p>Loading ... </p>)
    : (<div className="container">
            <div >
            <div className="single-meal container">
              <h1>{meal.strMeal}</h1>
              <img src={meal.strMealThumb} alt={meal.strMeal}/>
              <div className="single-meal-info">
                {meal.strCategory ? <p>{meal.strCategory}</p> : ''}
                {meal.strArea ? <p>{meal.strArea}</p> : ''}
              </div>
              <div className="main">
                <p>{meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                  {meal?.ingredients?.map(ing => <li key={ing}>{ing}</li>)}
                </ul>
              </div>
              </div>
              </div>
            </div>)
}

export default SingleMealPage
