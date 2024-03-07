import MealItem from "./MealItem";
import Error from "./Error";
import useHttp from "../hooks/useHttp";

// Request config needs to be set outside the function to prevent object recreation
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Ladataan tuotteita...</p>;
  }

	if (error) {
		return <Error title="Virhe" message={error} />
	}

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
