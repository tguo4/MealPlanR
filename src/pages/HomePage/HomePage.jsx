import NavBar from "../../components/NavBar/NavBar";
import './HomePage.css';
// import splash from '../../img/splash.jpg';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main className="HomePage">
        <div id="about">
          <h1>Welcome to MealPlanR</h1>
          <h3>Search for delicious recipes and save them for future reference.</h3>
          <h3>Create your own personal weekly meal planner.</h3>
        </div>
        <div id="splash">
        </div>
      </main>
    </>
  );
}