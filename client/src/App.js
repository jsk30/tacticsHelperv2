import { useState } from 'react';
import axios from 'axios';
import './App.css';
import UseMatchCard from './UseMatchCard';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";



function App() {
  const [searchID, setID] = useState("");
  const [matchHistory, setmatchHistory] = useState([]);
  const [myPUUID, setPUUID] = useState("");
  
  function getGames(event){
    axios.get("http://localhost:4000/past20Games", {params: {username: searchID}})
    .then(function (response) {
      setmatchHistory(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  console.log(matchHistory);

  function getPUUID(event){
    axios.get("http://localhost:4000/getPUUID", {params: {username: searchID}})
    .then(function(response) {
      setPUUID(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
      
      <div className='search'>
          <input onChange={e => setID(e.target.value) } placeholder="Enter RiotID#Tagline"></input>
        <button 
          onClick={() => {
            getGames();
            getPUUID();
          }}>
          Search
        </button>
        
      </div>
      {matchHistory.length !== 0 ? 
      <>
        <div className='matchGraph'>
          
        </div>
        {matchHistory.map((gameData, index) =>
            <>
              <div>
                <>
                  {gameData.info.participants.map((pInfo, pIndex) =>
                    pInfo.puuid === myPUUID ? 
                      <>
                        <UseMatchCard index={index} info={pInfo} companion={pInfo.companion.item_ID} />
                      </>
                      :
                      <></>
                  )}
                </>
              </div>
            </>
          )}
      </>
      :
      <>
        <p>Summoner does not exist or no data on Summoner was found.</p>
      </>
    }
    </div>
  );
}

export default App;
