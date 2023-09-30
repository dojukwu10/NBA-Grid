import "./App.css"
import Select from 'react-select'
import React, { useState, useEffect } from "react"

export default function App() {
  const [inputVisible, setInputVisible] = useState(false);
  const [input, setInput] = useState('');
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API and update the optionList
    const fetchData = (name) => {
      fetch('http://localhost:3000/player_routes/players/search?name=' + name)
        .then((res) => res.json())
        .then((playerData) => {
          // Map the playerData to an array of names (or whatever you want to display)
          const playerNames = playerData.map((player) => player.name);
          setOptionList(playerNames);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error fetching data:', error);
        });
    };

    // Update the optionList when input changes
    fetchData(input);
  }, [input]);

  // Function to show the input field when a grid element is clicked
  const clickGrid = () => {
    setInputVisible(true);
  };

  const updateSearchBar = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="app">
      {inputVisible ? (
        <div className="search-bar">
          <input size="80" placeholder="Search for player" onChange={updateSearchBar} />
          <div>
            <ul className="dropdown">
              {optionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      
    <div className="immaculate-grid">
    <h3></h3>
    <h3>Lakers</h3>
    <h3>Bulls</h3>
    <h3>Suns</h3>

    </div>

    <div className="immaculate-grid">
    <h3 className="grid-item">Suns</h3>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>
    <button    onClick={clickGrid} className="grid-item"> 
    </button>
    <h3 className="grid-item">Bulls</h3>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>
    <h3 className="grid-item">Thunder</h3>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>
    <button   onClick={clickGrid} className="grid-item"> 
    </button>

    
    
  
    </div>



    </div>
    
  )
}
  

