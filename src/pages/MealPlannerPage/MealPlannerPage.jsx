import MealPlannerTable from "../../components/MealPlannerTable/MealPlannerTable";
import NavBar from "../../components/NavBar/NavBar";
import './MealPlannerPage.css';

export default function MealPlannerPage({ user, setUser }) {
  return (
    <div className="MealPlannerPage">
      <NavBar user={user} setUser={setUser} />
      <h1>My Weekly Meal Planner</h1>

      <MealPlannerTable />

    </div>
  );
}