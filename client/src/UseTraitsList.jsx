import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './App.css';

const UseTraitList = ({traitName}) => {
    const [traitLink, setLink] = useState('');
    function getTrait(traitID) {
        axios.get("http://localhost:4000/getTraitIcon", {params: {trait: traitName}})
        .then(response => {
            setLink(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/tft-trait/` + response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect (() => {
        getTrait(traitName)
    }, [])

    return(
        <img src={traitLink} alt=''/>

    )}

export default UseTraitList;