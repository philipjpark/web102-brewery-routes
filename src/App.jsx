import { useState, useEffect } from 'react';
// import BreweryInfo from "./Components/breweryInfo";
import './App.css';
// import SideNav from "./Components/sideNav";

function App() {
    const [list, setList] = useState(null);

    useEffect(() => {
      const fetchAllBreweries = async () => {
        const response = await fetch(
          'https://api.openbrewerydb.org/v1/breweries'
        );
        const json = await response.json();
        setList(json);
      };
      fetchAllBreweries().catch(console.error);
    }, []);
    

  return (
    <div className="whole-page"> 
      <h1>🍺Breweries List</h1>
      <h3>Search for breweries.</h3>

      {list && Object.entries(list).map(([key, value]) => (
        <li key={value.id}>{value.name}</li>
      ))}

    </div>
  );
}

export default App;

