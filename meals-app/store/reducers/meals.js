import { MEALS } from "./../../data/dummy-data";

import { SET_FILTERS, TOGGLE_FAVORITE } from "./../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoritesMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoritesMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoritesMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoritesMeals: updatedFavMeals,
        };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoritesMeals: state.favoritesMeals.concat(meal),
        };
      }
      break;
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) return false;
        if (appliedFilters.lactose && !meal.isLactoseFree) return false;
        if (appliedFilters.vegan && !meal.isVegan) return false;
        if (appliedFilters.vegetarian && !meal.isVegetarian) return false;

        return true;
      });
      return {
        ...state,
        filteredMeals,
      };
      break;
    default:
      return state;
  }

  return state;
};

export default mealsReducer;
