
import "./App.css"
import Select from 'react-select'
import React, { useState, useEffect } from "react"


//highlight clicked grid 
export default function App(){

  
  const [turns, changeTurns] = useState(9);
  const [inputVisible, setInputVisible] = useState(false);
  const [menuEmpty, setMenuEmpty] = useState(true);
  const[input, setInput] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [clickedSquareTeams, setClickedSquareTeam] = useState([]);
  const selectedTeams = [];
  const selectedTeamsColor = [];

  const [team1, setTeam1Text] = useState('initial');
  const [team2, setTeam2Text] = useState('initial');
  const [team3, setTeam3Text] = useState('initial');
  const [team4, setTeam4Text] = useState('initial');
  const [team5, setTeam5Text] = useState('initial');
  const [team6, setTeam6Text] = useState('initial');
  const[team1Color, setTeam1Color] = useState('');
  const[team2Color, setTeam2Color] = useState('');
  const[team3Color, setTeam3Color] = useState('');
  const[team4Color, setTeam4Color] = useState('');
  const[team5Color, setTeam5Color] = useState('');
  const[team6Color, setTeam6Color] = useState('');

  const [square1Color, setSquare1Color] = useState(false);
  const [square2Color, setSquare2Color] = useState(false);
  const [square3Color, setSquare3Color] = useState(false);
  const [square4Color, setSquare4Color] = useState(false);
  const [square5Color, setSquare5Color] = useState(false);
  const [square6Color, setSquare6Color] = useState(false);
  const [square7Color, setSquare7Color] = useState(false);
  const [square8Color, setSquare8Color] = useState(false);
  const [square9Color, setSquare9Color] = useState(false);
  const [clickedPlayerName1, setClicked1PLayerName] = useState('');
  const [clickedPlayerName2, setClicked2PLayerName] = useState('');
  const [clickedPlayerName3, setClicked3PLayerName] = useState('');
  const [clickedPlayerName4, setClicked4PLayerName] = useState('');
  const [clickedPlayerName5, setClicked5PLayerName] = useState('');
  const [clickedPlayerName6, setClicked6PLayerName] = useState('');
  const [clickedPlayerName7, setClicked7PLayerName] = useState('');
  const [clickedPlayerName8, setClicked8PLayerName] = useState('');
  const [clickedPlayerName9, setClicked9PLayerName] = useState('');
  const [alreadyUsedPlayers, setAlreadyUsedPlayer] = useState([]);

  let square1 = [team1, team4];
  let square2 = [team2, team4];
  let square3 = [team3, team4];
  let square4 = [team1, team5];
  let square9 = [team6, team3];
  let square5 = [team2, team5];
  let square6 = [team3, team5];
  let square7 = [team6, team1];
  let square8 = [team6, team2];

  
  //let clickedSquareTeams = [];
  


  const nbaTeams = ["ATL", "BOS", "BRK", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS" ];
  const nbaTeamsColor = ['#FF0000', '#008000', '#000000', '#008080', '#FF0000', '#800000', '#00538C', '#FEC524', '#1D42BA', '#FFC72C', '#CE1141', '#FDBB30', '#C8102E', '#FDB927', '#5D76A9', '#98002E', '#00471B','#0C2340', '#0C2340', '#F58426', '#007AC1', '#0077C0', '#006BB6', '#1D1160', '#E03A3E', '#5A2D81', '#C4CED4', '#CE1141','#002B5C' , '#002B5C'];


  const selectTeams = () => 
  {
    let y = 0;
    while( y < 6){
    let x = Math.floor(Math.random()*30);
    if(!selectedTeams.includes(nbaTeams[x])){
    selectedTeams.push(nbaTeams[x]);
    selectedTeamsColor.push(nbaTeamsColor[x]);
  
    y++;
    }
    }
    console.log(selectedTeams[0]);
    console.log(selectedTeamsColor[0]);
  

    
    setTeam1Text(selectedTeams[0]);
    setTeam2Text(selectedTeams[1]);
    setTeam3Text(selectedTeams[2]);
    setTeam4Text(selectedTeams[3]);
    setTeam5Text(selectedTeams[4]);
    setTeam6Text(selectedTeams[5]);

    setTeam1Color(selectedTeamsColor[0]);
    setTeam2Color(selectedTeamsColor[1]);
    setTeam3Color(selectedTeamsColor[2]);
    setTeam4Color(selectedTeamsColor[3]);
    setTeam5Color(selectedTeamsColor[4]);
    setTeam6Color(selectedTeamsColor[5]);

    square1 = [selectedTeams[0], selectedTeams[3]];
    square2 = [selectedTeams[1], selectedTeams[3]];
    square3 = [selectedTeams[2], selectedTeams[3]];
    square4 = [selectedTeams[0], selectedTeams[4]];
    square5 = [selectedTeams[1], selectedTeams[4]];
    square6 = [selectedTeams[2], selectedTeams[4]];
    square7 = [selectedTeams[5], selectedTeams[0]];
    square8 = [selectedTeams[5], selectedTeams[1]];
    square9 = [selectedTeams[5], selectedTeams[2]]; 

    setSquare1Color(false);
    setSquare2Color(false);
    setSquare3Color(false);
    setSquare4Color(false);
    setSquare5Color(false);
    setSquare6Color(false);
    setSquare7Color(false);
    setSquare8Color(false);
    setSquare9Color(false);

    setClicked1PLayerName('');
    setClicked2PLayerName('');
    setClicked3PLayerName('');
    setClicked4PLayerName('');
    setClicked5PLayerName('');
    setClicked6PLayerName('');
    setClicked7PLayerName('');
    setClicked8PLayerName('');
    setClicked9PLayerName('');


    
  }

  /*pickPlayer = () => {



  }*/

//function fetchData is defined in useEffect. useEffect is called whenever changes is made to input of search bar. Searchbar input is used as argument fpr fetchData to search mongodb 
useEffect(() => {
  const fetchData = (name) => {
    fetch('http://localhost:3000/player_routes/players/search?name=' + name)
      .then((res) => res.json())
      .then((playerData) => {
        // Map the playerData to an array of player objects
        const playerObjects = playerData.map((player) => ({
          name: player.name,
          years: player.years+"   ",
          teams: player.teams,
          // Add other properties as needed
        }));

        if (input) {
          setOptionList(playerObjects);
          setMenuEmpty(false);
        } else {
          setOptionList([]);
          setMenuEmpty(true);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  };
  fetchData(input);
}, [input]);
  
  useEffect(() => {
  }, [clickedSquareTeams]);


  const clickPlayer = (playerInList) => {
    console.log(playerInList);
    if(playerInList.teams.includes(clickedSquareTeams[0]) && playerInList.teams.includes(clickedSquareTeams[1])){
 
      if(clickedSquareTeams.includes(square1[0]) && clickedSquareTeams.includes(square1[1])){

        if(alreadyUsedPlayers.includes(playerInList)){
          changeTurns(turns-1);
          console.log("PLAYER ALREADY USED");
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare1Color(true);
        setClicked1PLayerName(playerInList.name);
        }

      } else if(clickedSquareTeams.includes(square2[0]) && clickedSquareTeams.includes(square2[1])){

        if(alreadyUsedPlayers.includes(playerInList)){
          changeTurns(turns-1);
          console.log("PLAYER ALREADY USED");
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare2Color(true);
        setClicked2PLayerName(playerInList.name);
        }
      }
      else if(clickedSquareTeams.includes(square3[0]) && clickedSquareTeams.includes(square3[1])){
        if(alreadyUsedPlayers.includes(playerInList)){
          changeTurns(turns-1);
          console.log("PLAYER ALREADY USED");
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare3Color(true);
        setClicked3PLayerName(playerInList.name);
        }
      }
      else if(clickedSquareTeams.includes(square4[0]) && clickedSquareTeams.includes(square4[1])){
        if(alreadyUsedPlayers.includes(playerInList)){
          changeTurns(turns-1);
          console.log("PLAYER ALREADY USED");
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare4Color(true);
        setClicked4PLayerName(playerInList.name);
        }
      }
      else if(clickedSquareTeams.includes(square5[0]) && clickedSquareTeams.includes(square5[1])){
        if(alreadyUsedPlayers.includes(playerInList)){
          console.log("PLAYER ALREADY USED");
          changeTurns(turns-1);
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare5Color(true);
        setClicked5PLayerName(playerInList.name);
        }
      }
      else if(clickedSquareTeams.includes(square6[0]) && clickedSquareTeams.includes(square6[1])){
        if(alreadyUsedPlayers.includes(playerInList)){
          changeTurns(turns-1);
          console.log("PLAYER ALREADY USED");
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare6Color(true);
        setClicked6PLayerName(playerInList.name);
        }
      }
      else if(clickedSquareTeams.includes(square7[0]) && clickedSquareTeams.includes(square7[1])){
        if(alreadyUsedPlayers.includes(playerInList)){
          console.log("PLAYER ALREADY USED");
          changeTurns(turns-1);
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare7Color(true);
        setClicked7PLayerName(playerInList.name);
        }
      }
      else if(clickedSquareTeams.includes(square8[0]) && clickedSquareTeams.includes(square8[1])){
        if(alreadyUsedPlayers.includes(playerInList)){
          console.log("PLAYER ALREADY USED");
          changeTurns(turns-1);
        }
        else{
        setInput('');
        changeTurns(turns-1);  
        alreadyUsedPlayers.push(playerInList);
        setSquare8Color(true);
        setClicked8PLayerName(playerInList.name);
        }
      }
      else if(clickedSquareTeams.includes(square9[0]) && clickedSquareTeams.includes(square9[1])){
        if(alreadyUsedPlayers.includes(playerInList)){
          changeTurns(turns-1);
          console.log("PLAYER ALREADY USED");
        }
        else{
        setInput('');
        changeTurns(turns-1);
        alreadyUsedPlayers.push(playerInList);
        setSquare9Color(true);
        setClicked9PLayerName(playerInList.name);
        }
      }
    }
    else{
      changeTurns(turns-1);
    }
  

  }

  // Function to show the input field when a grid element is clicked
  const clickGrid = (teamsArray) => {
    setInputVisible(true);

    
    
    setClickedSquareTeam(teamsArray);


    
  }



//set the state variable input to the value of whatever is in the searchbar
const updateSearchBar = (i) => 
  {
  
    setInput(i.target.value);
  
  
    
  }




  return (
    <div className="app">
      
      {inputVisible ? (
     
          <input className="search-bar" size="80" placeholder="Search for player" onChange={updateSearchBar}/>
      
      ) : null}

          <div> 
          <button className="newGame" onClick={selectTeams}>New Game</button>
          <h2>Turns: {turns}</h2>
          <h2>{clickedSquareTeams[0]} & {clickedSquareTeams[1]}</h2>
          </div>

          {!menuEmpty ? (
<ul className="dropdown">
          {optionList.map((player, index) => (
    <button className="dropdown-items" key={index} onClick={() => clickPlayer(player)}>
      {player.name}:  {player.years}
    </button>
  ))}
      </ul>
          ) : null}

      
<div className="immaculate-grid">
    <h3></h3>

    <button className="immaculate-grid2" style={{ backgroundColor: team1Color }}>
        <span className="button-text">{team1}</span>
    </button>
    <button style={{ backgroundColor: team2Color }}>
        <span className="button-text">{team2}</span>
    </button>
    <button style={{ backgroundColor: team3Color }}>
        <span className="button-text">{team3}</span>
    </button>
    <button className="grid-item2" style={{ backgroundColor: team4Color }}>
        <span className="button-text">{team4}</span>
    </button>
    <button style={{ backgroundColor: square1Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square1)} className="grid-item">
        <span className="button-text">{clickedPlayerName1}</span>
    </button>
    <button style={{ backgroundColor: square2Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square2)} className="grid-item">
        <span className="button-text">{clickedPlayerName2}</span>
    </button>
    <button style={{ backgroundColor: square3Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square3)} className="grid-item">
        <span className="button-text">{clickedPlayerName3}</span>
    </button>
    <button className="grid-item2" style={{ backgroundColor: team5Color }}>
        <span className="button-text">{team5}</span>
    </button>
    <button style={{ backgroundColor: square4Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square4)} className="grid-item">
        <span className="button-text">{clickedPlayerName4}</span>
    </button>
    <button style={{ backgroundColor: square5Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square5)} className="grid-item">
        <span className="button-text">{clickedPlayerName5}</span>
    </button>
    <button style={{ backgroundColor: square6Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square6)} className="grid-item">
        <span className="button-text">{clickedPlayerName6}</span>
    </button>
    <button className="grid-item2" style={{ backgroundColor: team6Color }}>
        <span className="button-text">{team6}</span>
    </button>
    <button style={{ backgroundColor: square7Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square7)} className="grid-item">
        <span className="button-text">{clickedPlayerName7}</span>
    </button>
    <button style={{ backgroundColor: square8Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square8)} className="grid-item">
        <span className="button-text">{clickedPlayerName8}</span>
    </button>
    <button style={{ backgroundColor: square9Color === true ? '#008000' : '#808080' }} onClick={() => clickGrid(square9)} className="grid-item">
        <span className="button-text">{clickedPlayerName9}</span>
    </button>
</div>

    
    
  
    

    

    </div>
    
  )
}