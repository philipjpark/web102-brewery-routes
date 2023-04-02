import { useState, useEffect } from 'react';
// import BreweryInfo from "./Components/breweryInfo";
import './App.css';
// import SideNav from "./Components/sideNav";

function App() {
    const [list, setList] = useState(null);
    //search bar for states 
    const [query, setQuery] = useState('');

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
    
    const handleInputChange = event => {
      setQuery(event.target.value);
  };

  return (
    <div className="whole-page"> 
      <h1>🍺Breweries List</h1>
      <h3>Search for breweries.</h3>

      {/* {list && Object.entries(list).map(([key, value]) => (
        <li key={value.id}>{value.name}</li> */}

      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search by state" />

<ul>
  {list && Object.entries(list).map(([key, value]) => {
    if (value.state.toLowerCase().includes(query.toLowerCase())) {
      return <li key={value.id}>{value.name}</li>
    }
    return null;
  })}
</ul>


    </div>
  );
}

export default App;

