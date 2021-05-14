import React, { useState, useEffect } from "react";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-meals-3ae3d-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      let mealsArr = [];
      for (let i in data) {
        mealsArr.push({
          id: i,
          name: data[i].name,
          description: data[i].description,
          price: data[i].price,
        });
      }
      setMeals(mealsArr);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>;
  }

  if (error) {
    return <section className={classes.MealsError}>{error}</section>;
  }
  if (meals.length !== 0) {
    return (
      <section className={classes.meals}>
        <Card>
          <ul>
            {meals.map((meal) => (
              <MealItem key={meal.id} {...meal} />
            ))}
          </ul>
        </Card>
      </section>
    );
  }
  return null;
};

export default AvailableMeals;
