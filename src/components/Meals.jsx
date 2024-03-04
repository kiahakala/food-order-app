import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

	useEffect(() => {
		// a wrapped function can be async unlike a top-level function:
		async function fetchMeals() {
			const response = await fetch("http://localhost:3000/meals");
	
			if (!response.ok) {
				// ...
			}
	
			const meals = await response.json();
			setLoadedMeals(meals);
		}

		fetchMeals();
	}, []);

	console.log(loadedMeals)

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
