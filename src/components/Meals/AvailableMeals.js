import React, { useState, useEffect } from "react";
import Card from "../UI/card";
import "./AvailableMeals.css";
import Mealitem from "./MealItem";

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 1499.50,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 1110.50,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 849.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 999.99,
//     },
//   ];

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] =  useState(true);
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    
    const fetchMeals = async()=>{
      
      const response = await fetch("https://food-delivery-74320-default-rtdb.firebaseio.com/meals.json");

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();

      const loaded = [];

      for (const keys in data) {
        loaded.push({
          id: keys,
          name: data[keys].name,
          description: data[keys].description,
          price: data[keys].price
        });
      }
      setMeals(loaded);
      setIsLoading(false);
    }

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message);
    });
  }, []);
  
  if (httpError) {
    return (
      <Card width={true}>
        <p  style={{textAlign: "center", color: 'whitesmoke'}}>{httpError}</p>
      </Card>
    )
  }
  const newMeals = meals.map((item) => (
    <Mealitem
      id={item.id}
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        <ul>{newMeals}</ul>
        {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
        {/* {httpError && <p style={{textAlign: "center", color: 'red'}}>{httpError}</p>} */}
      </Card>
    </section>
  );
}

export default AvailableMeals;
