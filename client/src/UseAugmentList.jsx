import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './App.css';

const UseAugmentList = ({augName}) => {
    const [augLink, setLink] = useState('');
    function getAugment(augID) {
        axios.get("http://localhost:4000/getAugmentIcon", {params: {augment: augName}})
        .then(response => {
            setLink(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/tft-augment/` + response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect (() => {
        getAugment(augName)
    }, [])

    return(
        <img className="aug_img" src={augLink} alt=''/>
    )}

export default UseAugmentList;