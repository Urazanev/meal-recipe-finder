import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MealCard = ({ meal }) => {
  const { idMeal, strMealThumb, strMeal } = meal
  const navigate = useNavigate()
  return (
      <div data-testid="meal-card" className="meal" onClick={() => navigate(`/meal/${idMeal}`)}>
        <img src={strMealThumb} alt={strMeal} />
        <div className="meal-info" >
          <h3>{strMeal}</h3>
        </div>
      </div>
  )
}
