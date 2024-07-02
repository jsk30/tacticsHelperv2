import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './App.css';
import UseTraitList from "./UseTraitsList";
import UseAugmentList from "./UseAugmentList";

const UseMatchCard = ({ index, info, companion }) => {
    const [LLLink, setLink] = useState('');
    function getTactician(itemID) {
        axios.get("http://localhost:4000/getLL", {params: {tactician: itemID}})
        .then(response => {
          setLink(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/tft-tactician/` + response.data);
        })
        .catch(error => {
          console.error(error);
        });
      }
    
    useEffect(() => {
    getTactician(companion)
    },[])

    

    return(
      <div className='matchCard'>
        <img className ='matchCard_img' src={LLLink} alt=''/>
        <div className='matchCard_text'>
          Game {index + 1}
          <p>
            Placement: {info.placement} | Game Time: {Math.floor(info.time_eliminated/60)}:{Math.round(info.time_eliminated%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
          </p>
          <p>
            {info.augments.map((aInfo, aIndex) => 
                <>
                  <UseAugmentList augName={aInfo}/>
                </>
              )}
          </p>
          <p>{info.traits.map((tInfo, tIndex) =>
              tInfo.tier_current > 0 ?
                <>
                  <UseTraitList traitName={tInfo.name}></UseTraitList>
                </>
           :
           <></>
           )} 
          </p>
        </div>
      </div>
    )}
    
export default UseMatchCard;