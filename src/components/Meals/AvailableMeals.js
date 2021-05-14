import React, { useState, useEffect } from "react";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-meals-3ae3d-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
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
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => <MealItem key={meal.id} {...meal} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
