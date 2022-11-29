import './MealPlannerTable.css';
import { Link } from 'react-router-dom';
import { days, breakfast, lunch, dinner } from '../../mealPlannerData';

export default function MealPlannerTable() {
  return (
    <div className='MealPlannerTable'>
      <table>
        <thead>
          <tr>
            <td className='empty'></td>
            {days.map((val, index) => {
              return (
                <th key={index}>{val}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Breakfast</th>
            {breakfast.map((val, index) => {
              if (val.meal) {
                return (
                  <td key={index}>{val.meal} <br /><span>Calories: {val.calories}</span></td>
                );
              } else return (<td key={index}></td>);
            })}
          </tr>
          <tr>
            <th>Lunch</th>
            <td >
              <a href="https://www.foodnetwork.com/recipes/food-network-kitchen/lemon-herb-rice-salad-recipe-2107971"
                target="blank">
                Lemon-Herb Rice Salad<br /><span>Calories: 378</span>
              </a>
            </td>
            {lunch.map((val, index) => {
              if (val.meal) {
                return (
                  <td key={index}>{val.meal} <br /><span>Calories: {val.calories}</span></td>
                );
              } else return (<td key={index}></td>);
            })}
          </tr>
          <tr>
            <th>Dinner</th>
            {dinner.map((val, index) => {
              if (val.meal) {
                return (
                  <td key={index}>{val.meal} <br /><span>Calories: {val.calories}</span></td>
                );
              } else return (<td key={index}></td>);
            })}
          </tr>
        </tbody>
      </table>

    </div >
  );
}