import React from "react";
import axios from "axios";
import './App.css';

import { useState, useEffect } from 'react';

/**
 * UseAugmentList component is responsible for fetching and displaying the augment icon
 * based on the augment name provided as a prop. It makes an API call to retrieve the
 * appropriate icon and displays it.
 *
 * @component
 * @param {string} augName - The name or ID of the augment to display the icon for.
 *
 */
const UseAugmentList = ({ augName }) => {
  // sets the link to get the augment image
  const [augLink, setLink] = useState('');

  /**
   * Fetches the image of the augment based on the augment name or ID.
   * Makes an API call to a local server to retrieve the augment's image filename.
   * The image link is then set using `setLink`.
   *
   * @param {string} augID - The ID or name of the augment to get the image for.
   */
  function getAugment(augID) {
    axios
      .get('http://localhost:4000/getAugmentIcon', { params: { augment: augName } })
      .then((response) => {
        setLink(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/tft-augment/` + response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Runs the getAugment function once when the component mounts
  useEffect(() => {
    getAugment(augName);
  }, [augName]);

  // Render the augment image
  return <img className="aug_img" src={augLink} alt="" />;
};

export default UseAugmentList;
