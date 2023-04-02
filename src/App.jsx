import { useState, useEffect } from 'react';
import './App.css';
// import BreweryInfo from "./Components/breweryInfo";
// import SideNav from "./Components/sideNav";

function App() {
  const [list, setList] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  
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
    setSelectedState(event.target.value);
  };

  const handleSelectChange = event => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="whole-page"> 
      <h1>🍺Breweries List</h1>
      <h3>Search for breweries.</h3>

      {/* //fetches all of the breweries and displays them in a list
      {list && Object.entries(list).map(([key, value]) => (
        <li key={value.id}>{value.name}</li> */}

      <input 
        className="search-bar"
        type="text" 
        value={selectedState} 
        onChange={handleInputChange}
        placeholder="SEARCH BY STATE" />

      <h3>Filter by brewery type:</h3>

      <select 
        className="select-bar"
        value={selectedType} 
        onChange={handleSelectChange}>
          <option value="">All Types</option>
          <option value="micro">Micro</option>
          <option value="brewpub">Brewpub</option>
          <option value="large">Large</option>
          <option value="contract">Contract</option>
          <option value="proprietor">Proprietor</option>
          <option value="closed">Closed</option>
      </select>

      {/* //fetches breweries by state and displays them in a list
      <ul>
        {list && Object.entries(list).map(([key, value]) => {
          if (value.state.toLowerCase().includes(selectedState.toLowerCase())) {
            return <li key={value.id}>{value.name}</li>
          }
          return null;
        })}
      </ul> */}

      {/* fetches breweries by state and by type */}
      <ul>
        {list && Object.entries(list).map(([key, value]) => {
          if ((selectedState === '' || value.state.toLowerCase().includes(selectedState.toLowerCase())) &&
              (selectedType === '' || value.brewery_type === selectedType)) {
            return <li key={value.id}>{value.name}</li>
          }
          return null;
        })}
      </ul>



    </div>
  );
}

export default App;

