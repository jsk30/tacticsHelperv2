import { useState } from 'react';
import axios from 'axios';
import './App.css';
import UseMatchCard from './UseMatchCard';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";



// Main App Component
function App() {
  // Declare state variables using useState Hook
  const [searchID, setID] = useState(""); // State to store the user’s input (Riot ID and Tagline)
  const [matchHistory, setmatchHistory] = useState([]); // State to store match history data from API
  const [myPUUID, setPUUID] = useState(""); // State to store the user’s PUUID (Player Unique Identifier)

  // Function to fetch match history from the server (calls a backend endpoint to get data)
  function getGames(event) {
    axios.get("http://localhost:4000/past20Games", { params: { username: searchID } }) // Send GET request to backend
      .then(function (response) {
        setmatchHistory(response.data); // Set match history state with response data from the server
      })
      .catch(function (error) {
        console.log(error); // Log any errors that occur during the request
      });
  }

  // Function to fetch the player's PUUID from the server (calls a backend endpoint to get data)
  function getPUUID(event) {
    axios.get("http://localhost:4000/getPUUID", { params: { username: searchID } }) // Send GET request to backend
      .then(function (response) {
        setPUUID(response.data); // Set PUUID state with response data from the server
      })
      .catch(function (error) {
        console.log(error); // Log any errors that occur during the request
      });
  }

  // Output the match history to the console (for debugging purposes)
  console.log(matchHistory);

  // JSX - User Interface of the component
  return (
    <div className="App">
      
      {/* Input field for user to enter their Riot ID and Tagline */}
      <div className='search'>
        <input 
          onChange={e => setID(e.target.value)} // Update state with the user's input
          placeholder="Enter RiotID#Tagline" // Placeholder text in the input field
        />
        <button 
          onClick={() => {
            getGames(); // Trigger the getGames function to fetch match data
            getPUUID(); // Trigger the getPUUID function to fetch PUUID data
          }}>
          Search
        </button>
      </div>

      {/* Conditionally render match data if available */}
      {matchHistory.length !== 0 ? (
        <>
          <div className='matchGraph'>
            {/* Placeholder for potential chart/graph visualization */}
          </div>

          {/* Loop through matchHistory to display individual matches */}
          {matchHistory.map((gameData, index) => (
            <div key={index}>
              {/* Loop through participants in each match to find the current user (based on PUUID) */}
              {gameData.info.participants.map((pInfo, pIndex) =>
                pInfo.puuid === myPUUID ? (
                  <UseMatchCard 
                    key={pIndex} 
                    index={index} // Pass match index to UseMatchCard component
                    info={pInfo} // Pass participant info to UseMatchCard component
                    companion={pInfo.companion.item_ID} // Pass companion item ID to UseMatchCard component
                  />
                ) : null
              )}
            </div>
          ))}
        </>
      ) : (
        /* Display message if no match history is found */
        <p>Summoner does not exist or no data on Summoner was found.</p>
      )}
    </div>
  );
}

export default App;